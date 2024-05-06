import { FormApi, mergeForm, useTransform } from "@tanstack/react-form";
import action, { TResult } from "./action";
import { useFormState } from "react-dom";
import formFactory from "./form-instance";
import ButtonComp from "../shared/button";
import ErrorText from "../shared/error-text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RegisterForm = () => {
  const [state, setAction] = useFormState(action, formFactory.initialFormState);

  const { useStore, Subscribe, handleSubmit, Field } = formFactory.useForm({
    transform: useTransform(
      (baseForm: FormApi<any, any>) => mergeForm(baseForm, state),
      [state]
    ),
  });

  const formErrors = useStore((formState) => formState.errors);
  const serverErrors = formErrors.reduce((acc, curr) => {
    if (!curr) return acc;
    const [key, value] = curr.split(" | ");
    const result = { ...acc, [key]: value };
    return result;
  }, {} as TResult);

  return (
    <form
      action={setAction as never}
      onSubmit={handleSubmit}
      className=" flex flex-col gap-3"
    >
      <Field name="name">
        {(field) => {
          return (
            <fieldset className=" grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ErrorText error={field.state.meta.errors}>
                {serverErrors?.name}
              </ErrorText>
            </fieldset>
          );
        }}
      </Field>

      <Field name="email">
        {(field) => {
          return (
            <fieldset className=" grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ErrorText error={field.state.meta.errors}>
                {serverErrors?.email}
              </ErrorText>
            </fieldset>
          );
        }}
      </Field>

      <Field name="password">
        {(field) => {
          return (
            <fieldset>
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ErrorText error={field.state.meta.errors}>
                {serverErrors?.password}
              </ErrorText>
            </fieldset>
          );
        }}
      </Field>
      <Subscribe selector={(formState) => [formState.canSubmit]}>
        {([canSubmit]) => <ButtonComp>Create Account</ButtonComp>}
      </Subscribe>
    </form>
  );
};

export default RegisterForm;
