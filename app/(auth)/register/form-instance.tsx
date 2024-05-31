import { createFormFactory } from '@tanstack/react-form';
import z from 'zod';

export const schema = z.object({
  name: z.string().min(2, 'name | Name is required'),
  email: z.string().email('email | email is invalid'),
  password: z
    .string()
    .min(6, 'password | Password must be at least 6 characters'),
});

const formFactory = createFormFactory({
  defaultValues: {
    name: '',
    email: '',
    password: '',
  },
});

export default formFactory;
