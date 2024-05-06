import { ValidationError } from "@tanstack/react-form";

const ErrorText = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error: ValidationError[];
}) => {
  return (
    <div className=" -mt-1">
      {error.map((error) => (
        <p key={error as string}>{error}</p>
      ))}
      {error.length === 0 && (
        <p className="text-red-500 text-[13px]">{children}</p>
      )}
    </div>
  );
};

export default ErrorText;
