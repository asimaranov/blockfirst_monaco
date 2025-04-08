import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import VacancyModel, { IVacancy } from '~/server/models/vacancy';
import {
  VacancyFormat,
  VacancySpeciality,
  VacancyCurrency,
} from '~/app/lib/constants/vacancies';
import dbConnect from '~/server/mongodb';
import { TRPCError } from '@trpc/server';

// Define Zod schemas for validation
const SalaryAmountSchema = z.union([
  z.number(),
  z.object({
    from: z.number().optional(),
    to: z.number().optional(),
  }),
]);

const SalarySchema = z.object({
  amount: SalaryAmountSchema,
  currency: z.nativeEnum(VacancyCurrency),
});

const PublisherContactsSchema = z.object({
  telegram: z.string(),
  cite: z.string(),
  email: z.string().email(),
});

const PublisherSchema = z.object({
  name: z.string(),
  contacts: PublisherContactsSchema,
});

const VacancyInputSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  speciality: z.string(),
  format: z.union([
    z.nativeEnum(VacancyFormat),
    z.tuple([z.nativeEnum(VacancyFormat), z.nativeEnum(VacancyFormat)]),
  ]),
  salary: SalarySchema.optional(),
  publisher: PublisherSchema,
  responsibilities: z.array(z.string()),
  requirements: z.array(z.string()),
  applied: z.boolean().optional(),
  isPersonal: z.boolean().optional(),
  userId: z.string().optional(),
});

export const vacanciesRouter = createTRPCRouter({
  // Get all vacancies
  getAll: publicProcedure
    .input(
      z
        .object({
          specialities: z.array(z.string()).optional(),
          limit: z.number().min(1).max(100).optional(),
          offset: z.number().min(0).optional(),
          sortBy: z.enum(['updatedAt', 'salary']).optional(),
          sortOrder: z.enum(['asc', 'desc']).optional(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      await dbConnect();

      // Build query
      const query: any = {};

      // Add speciality filter if provided
      if (input?.specialities && input.specialities.length > 0) {
        query.speciality = { $in: input.specialities };
      }

      // Only show public vacancies or personal vacancies for the current user
      if (ctx.session?.user?.id) {
        // If user is logged in, show all public vacancies and their personal vacancies
        query.$or = [
          { isPersonal: { $ne: true } }, // Public vacancies
          { isPersonal: true, userId: ctx.session.user.id }, // Personal vacancies for this user
        ];
      } else {
        // If not logged in, only show public vacancies
        query.isPersonal = { $ne: true };
      }

      // Build sort options
      const sortOptions: any = {};
      if (input?.sortBy) {
        const sortOrder = input.sortOrder === 'asc' ? 1 : -1;

        if (input.sortBy === 'salary') {
          sortOptions['salary.amount'] = sortOrder;
        } else {
          sortOptions[input.sortBy] = sortOrder;
        }
      } else {
        // Default sort by updatedAt descending
        sortOptions.updatedAt = -1;
      }

      // Execute query with pagination
      const vacancies = await VacancyModel.find(query)
        .sort(sortOptions)
        .skip(input?.offset || 0)
        .limit(input?.limit || 50);

      const total = await VacancyModel.countDocuments(query);

      return {
        vacancies: vacancies.map((vacancy) => vacancy.toJSON()),
        total,
      };
    }),

  // Get all personal vacancies for the current user
  getPersonalVacancies: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).optional(),
          offset: z.number().min(0).optional(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      await dbConnect();

      const query = {
        isPersonal: true,
        userId: ctx.session.user.id,
      };

      const vacancies = await VacancyModel.find(query)
        .sort({ updatedAt: -1 })
        .skip(input?.offset || 0)
        .limit(input?.limit || 50);

      const total = await VacancyModel.countDocuments(query);

      return {
        vacancies: vacancies.map((vacancy) => vacancy.toJSON()),
        total,
      };
    }),

  // Get vacancy by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      await dbConnect();

      const vacancy = await VacancyModel.findById(input.id);

      if (!vacancy) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Vacancy not found',
        });
      }

      // Check if vacancy is personal and belongs to current user
      if (vacancy.isPersonal && vacancy.userId !== ctx.session?.user?.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to view this vacancy',
        });
      }

      return vacancy.toJSON();
    }),

  // Create a new vacancy
  create: protectedProcedure
    .input(VacancyInputSchema)
    .mutation(async ({ input, ctx }) => {
      await dbConnect();

      // Only allow admin or HR roles to create public vacancies
      if (
        !input.isPersonal &&
        !ctx.session.user.role &&
        ctx.session.user.role !== 'admin'
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to create public vacancies',
        });
      }

      // For personal vacancies, ensure the userId is set to the current user
      const vacancyData = {
        ...input,
        updatedAt: new Date(),
      };

      if (input.isPersonal) {
        vacancyData.userId = ctx.session.user.id;
      }

      const newVacancy = new VacancyModel(vacancyData);
      await newVacancy.save();

      return newVacancy.toJSON();
    }),

  // Create a personal vacancy for current user
  createPersonal: protectedProcedure
    .input(VacancyInputSchema.omit({ isPersonal: true, userId: true }))
    .mutation(async ({ input, ctx }) => {
      await dbConnect();

      const newVacancy = new VacancyModel({
        ...input,
        isPersonal: true,
        userId: ctx.session.user.id,
        updatedAt: new Date(),
      });

      await newVacancy.save();

      return newVacancy.toJSON();
    }),

  // Update an existing vacancy
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: VacancyInputSchema.partial(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await dbConnect();

      const vacancy = await VacancyModel.findById(input.id);

      if (!vacancy) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Vacancy not found',
        });
      }

      // Check permissions: allow admin/HR to update any vacancy, and users to update their personal vacancies
      const isAdmin = ctx.session.user.role === 'admin';
      const isPersonalOwner =
        vacancy.isPersonal && vacancy.userId === ctx.session.user.id;

      if (!isAdmin && !isPersonalOwner) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to update this vacancy',
        });
      }

      // Don't allow changing ownership of personal vacancies
      const updateData = { ...input.data };
      if (vacancy.isPersonal) {
        delete updateData.isPersonal;
        delete updateData.userId;
      }

      // Update fields
      Object.assign(vacancy, updateData, { updatedAt: new Date() });
      await vacancy.save();

      return vacancy.toJSON();
    }),

  // Delete a vacancy
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await dbConnect();

      const vacancy = await VacancyModel.findById(input.id);

      if (!vacancy) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Vacancy not found',
        });
      }

      // Check permissions: allow admin/HR to delete any vacancy, and users to delete their personal vacancies
      const isAdmin = ctx.session.user.role === 'admin';
      const isPersonalOwner =
        vacancy.isPersonal && vacancy.userId === ctx.session.user.id;

      if (!isAdmin && !isPersonalOwner) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to delete this vacancy',
        });
      }

      await VacancyModel.deleteOne({ _id: input.id });

      return { success: true };
    }),

  // Mark a vacancy as applied by the current user
  markAsApplied: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await dbConnect();

      const vacancy = await VacancyModel.findById(input.id);

      if (!vacancy) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Vacancy not found',
        });
      }

      // Check if this is a personal vacancy that belongs to the user
      if (vacancy.isPersonal && vacancy.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to apply to this vacancy',
        });
      }

      // For simplicity, we're just setting applied=true
      // In a real app, you'd create an application record
      vacancy.applied = true;
      await vacancy.save();

      return vacancy.toJSON();
    }),
});
