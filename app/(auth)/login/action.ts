'use server';

import { signIn } from '@/auth/auth';
import formFactory, { schema } from './form-instance';
const initialState = formFactory.initialFormState.values!;
export type TResult = typeof initialState;
import db from '@/db';
import { user } from '@/db/schema';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';

const action = async (formData: TResult) => {
  const res = schema.safeParse(formData);

  if (!res.success) {
    return {
      message: res.error.errors[0].message,
      status: false,
    };
  }

  const { password, email } = formData;
  const isUserExist = await db.select().from(user).where(eq(user.email, email));

  if (isUserExist.length === 0) {
    return {
      message: 'User not found',
      status: false,
    };
  }

  const { password: existPassword, ...rest } = isUserExist[0];
  const isPasswordMatch = existPassword.includes('$argon')
    ? await argon2.verify(existPassword, password)
    : existPassword === password;

  if (!isPasswordMatch) {
    return {
      message: 'Password is incorrect',
      status: false,
    };
  }

  await signIn('credentials', {
    email: rest.email,
    name: rest.name,
    id: rest.id,
    redirect: true,
    redirectTo: '/',
  });

  return {
    message: 'User logged in successfully',
    status: true,
  };
};

export default action;
