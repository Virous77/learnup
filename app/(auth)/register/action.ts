"use server";

import formFactory, { schema } from "./form-instance";
const initialState = formFactory.initialFormState.values!;
export type TResult = typeof initialState;
import db from "@/db";
import { user } from "@/db/schema";
import argon2 from "argon2";
import { nanoid } from "nanoid";

const action = async (formData: TResult) => {
  const res = schema.safeParse(formData);

  if (!res.success) {
    return {
      message: res.error.errors[0].message,
      status: false,
    };
  }

  const { password, ...rest } = formData;
  const hashedPassword = await argon2.hash(password);
  const isAlreadyRegistered = (await db.select().from(user)).find(
    (user) => user.email === rest.email
  );

  if (isAlreadyRegistered) {
    return {
      message: "Email already registered",
      status: false,
    };
  }

  await db.insert(user).values({
    ...rest,
    password: hashedPassword,
    id: nanoid(),
  });

  return {
    message: "User registered successfully",
    status: true,
  };
};

export default action;
