import { createHash, randomUUID } from 'crypto';
import { z } from 'zod';
import { ALL_TARIFFS } from '~/app/lib/constants/tariff';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import { authClient } from '~/server/auth/client';

const password = process.env.TINKOFF_PASSWORD!;

export const tinkoffRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createPaymentLink: protectedProcedure
    .input(z.object({ tariff: z.string() }))
    .output(z.string())
    .mutation(async ({ ctx, input }) => {
      console.log('input input', input);

      const session = ctx.session;

      const tariff = ALL_TARIFFS.find((t) => t.id === input.tariff);

      const request = {
        TerminalKey: '1746107725696DEMO',
        Amount: (tariff?.price?.total || 0) * 100,
        OrderId: `${session?.user?.email}-${tariff?.id}-${new Date().getTime()}`,
        Description: 'Покупка тарифа',
        NotificationURL: 'https://app.blockfirst.io/api/tinkoff/confirm-payment',
        SuccessURL: 'https://app.blockfirst.io/pricing?success=true',
        FailURL: 'https://app.blockfirst.io/pricing?error=true',
        Receipt: {
          FfdVersion: '1.05',
          Email: session?.user?.email || 'test@test.com',
          Taxation: 'usn_income',
          Items: [
            {
              Name: tariff?.name || '',
              Description: tariff?.description || '',
              Price: (tariff?.price?.total || 0) * 100,
              Quantity: 1.0,
              Amount: (tariff?.price?.total || 0) * 100,
              Tax: 'none',
              PaymentMethod: 'full_payment',
              PaymentObject: 'service',
              MeasurementUnit: 'шт.',
            },
          ],
        },
        Token: '',
      };
      const data = {
        Amount: request.Amount,
        Description: request.Description,
        FailURL: request.FailURL,
        NotificationURL: request.NotificationURL,
        OrderId: request.OrderId,
        Password: password,
        SuccessURL: request.SuccessURL,
        TerminalKey: request.TerminalKey,
      };

      // sort data by keys
      const sorted_data = Object.keys(data)
        .sort()
        .reduce<Record<string, string | number>>((obj, key) => {
          obj[key] = data[key as keyof typeof data];
          return obj;
        }, {});

      // create signature
      const signature = Object.keys(sorted_data)
        .map((key) => `${sorted_data[key]}`)
        .join('');

      // In python it's like this: token = hashlib.sha256(token_string.encode('utf-8')).hexdigest()
      // so we need to do the same in javascript
      const token = createHash('sha256').update(signature).digest('hex');

      console.log(token);

      request.Token = token;

      const createPaymentRequest = await fetch(
        'https://securepay.tinkoff.ru/v2/Init',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      const response = await createPaymentRequest.json();

      console.log(response);

      return response.PaymentURL;
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {}),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
