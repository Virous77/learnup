import { ValidationError } from '@tanstack/react-form';

const ErrorText = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error: ValidationError[];
}) => {
  return (
    <div className="-mt-1">
      {error.map((error) => (
        <p className="text-[13px] text-red-500" key={error as string}>
          {error}
        </p>
      ))}
      {error.length === 0 && (
        <p className="text-[13px] text-red-500">{children}</p>
      )}
    </div>
  );
};

export default ErrorText;
