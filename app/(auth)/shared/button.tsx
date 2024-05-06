import BounceLoader from "@/components/ui/bounceloader";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type TButton = {
  children: React.ReactNode;
};

const ButtonComp: React.FC<TButton> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} aria-label="Auth button" className="w-full mt-3">
      {pending ? <BounceLoader /> : children}
    </Button>
  );
};

export default ButtonComp;
