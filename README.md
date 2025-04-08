# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

# Vacancies Feature

This project now includes a MongoDB-backed vacancies feature.

## Initial Setup

1. Make sure your MongoDB connection string is configured in `.env`:

```
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=blockfirst
```

2. Seed the initial vacancies data:

```bash
npm run seed:vacancies
```

## Features

- **MongoDB Integration**: Vacancies are stored in MongoDB
- **tRPC API**: Access vacancies data through typed API endpoints
- **Sorting and Filtering**: Sort by salary, publication date, and filter by speciality
- **Application Handling**: Users can apply to vacancies which are tracked in the database
- **Personal Vacancies**: Support for personal vacancies visible only to specific users

## API Endpoints

- `vacancies.getAll`: Get all vacancies with optional filtering and sorting (includes personal vacancies for the current user)
- `vacancies.getPersonalVacancies`: Get only personal vacancies for the current user
- `vacancies.getById`: Get a specific vacancy by ID
- `vacancies.create`: Create a new vacancy (protected endpoint)
- `vacancies.createPersonal`: Create a new personal vacancy for a specific user (protected endpoint)
- `vacancies.update`: Update an existing vacancy (protected endpoint)
- `vacancies.delete`: Delete a vacancy (protected endpoint)
- `vacancies.markAsApplied`: Mark a vacancy as applied by the current user

## Personal Vacancies

Personal vacancies are job listings visible only to specific users. This is useful for:

- Sending exclusive job offers to select candidates
- Creating personalized recommendations based on user profiles
- Showing tailored opportunities to users with specific skills

When seeding data, the script includes sample personal vacancies with placeholder user IDs. To test with real users:

1. Edit the `SAMPLE_USER_IDS` array in `src/scripts/seed-vacancies.ts` with real user IDs
2. Run the seed script with the --force flag: `npm run seed:vacancies -- --force`

Personal vacancies are visually indicated with a "Персональное" badge in the UI.

## Development

To add new vacancies manually, you can use the MongoDB shell or a GUI like MongoDB Compass, or you can update the seed script and re-run it with the `--force` flag:

```bash
npm run seed:vacancies -- --force
```
