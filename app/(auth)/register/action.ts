"use server";

import formFactory from "./form-instance";
const initialState = formFactory.initialFormState.values!;
export type TResult = typeof initialState;
import db from "@/db";
import { user } from "@/db/schema";
import argon2 from "argon2";
import { nanoid } from "nanoid";

const getFormData = (formData: FormData) => {
  const result = {} as TResult;

  formData.forEach((data, key) => {
    if (key.includes("$ACTION")) return;
    (result as any)[key] = data;
  });
  return result;
};

const action = async (prev: unknown, formData: FormData) => {
  const res = await formFactory.validateFormData(formData);
  if (res.errors && res.errors?.length > 0) return res;

  const data = getFormData(formData);
  const { password, ...rest } = data;
  const hashedPassword = await argon2.hash(password);

  try {
    await db.insert(user).values;
    ({
      id: nanoid(),
      ...rest,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
  }

  return res;
};

export default action;
