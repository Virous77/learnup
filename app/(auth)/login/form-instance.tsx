import { createFormFactory } from '@tanstack/react-form';
import z from 'zod';

export const schema = z.object({
  email: z.string().email('email | email is invalid'),
  password: z
    .string()
    .min(6, 'password | Password must be at least 6 characters'),
});

const formFactory = createFormFactory({
  defaultValues: {
    email: '',
    password: '',
  },
});

export default formFactory;
