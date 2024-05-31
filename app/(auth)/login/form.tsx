'use client';

import action, { TResult } from './action';
import formFactory, { schema } from './form-instance';
import ErrorText from '../shared/error-text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import BounceLoader from '@/components/ui/bounceloader';

const LoginForm = () => {
  const { useStore, Subscribe, handleSubmit, Field } = formFactory.useForm({
    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          const schemaResult = schema.safeParse(value);
          if (!schemaResult.success) {
            return schemaResult.error.errors[0].message;
          }

          const res = await action(schemaResult.data);
          if (res && !res?.status) {
            toast.error(res?.message);
            return;
          }
        } catch (error) {
          toast.error('Something went wrong');
        }
      },
    },
  });

  const formErrors = useStore((formState) => formState.errors);
  const serverErrors = formErrors.reduce((acc, curr) => {
    if (!curr) return acc;
    const [key, value] = curr.split(' | ');
    const result = { ...acc, [key]: value };
    return result;
  }, {} as TResult);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-3"
    >
      <Field name="email">
        {(field) => {
          return (
            <fieldset className="grid gap-2">
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
            <fieldset className="grid gap-2">
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
      <Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isPending]) => (
          <Button>{isPending ? <BounceLoader /> : 'Login'}</Button>
        )}
      </Subscribe>
    </form>
  );
};

export default LoginForm;
