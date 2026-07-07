import { z } from 'zod';

const PathsSchema = z.object({
  auth: z.object({
    signIn: z.string().min(1),
    signUp: z.string().min(1),
    verifyMfa: z.string().min(1),
    callback: z.string().min(1),
    passwordReset: z.string().min(1),
    passwordUpdate: z.string().min(1),
  }),
  app: z.object({
    home: z.string().min(1),
    dashboard: z.string().min(1),
    products: z.string().min(1),
    financial: z.string().min(1),
    clients: z.string().min(1)
  }),
});

const pathsConfig = PathsSchema.parse({
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    verifyMfa: '/auth/verify',
    callback: '/auth/callback',
    passwordReset: '/auth/password-reset',
    passwordUpdate: '/update-password',
  },
  app: {
    home: '/home/dashboard',
    dashboard: '/home/dashboard',
    products: '/home/products',
    financial: '/home/financial',
    clients: '/home/clients',
  },
} satisfies z.infer<typeof PathsSchema>);

export default pathsConfig;
