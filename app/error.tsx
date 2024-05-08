"use client";
import errorImg from "../public/not-found.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main
      className=" flex items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className=" flex items-center flex-col">
        <Image src={errorImg.src} alt="404 image" width={350} height={350} />
        <p className=" mt-2 text-muted-foreground">
          Oops! Something went wrong...
        </p>
        <Button className="mt-2 px-8" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </main>
  );
}
