import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginSchema = (t: any) =>
  z.object({
    email: z
      .string()
      .trim()
      .email(t('emailInvalid'))
      .nonempty(t('emailRequired')),

    password: z.string().nonempty(t('passwordRequired')),
    rememberMe: z.boolean().optional(),
  });

export type LoginFormType = z.infer<ReturnType<typeof loginSchema>>;