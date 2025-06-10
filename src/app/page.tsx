"use client";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

function Homepage() {
  const [openSheet, setOpenSheet] = useState(false);
  const queryStrings = useSearchParams();
  const form = queryStrings.get("form");
  return (
    <div className="home-parent py-10 px-20">
      <div className="flex justify-between items-center">
        <h1 className="Shey.Fit text-2xl font-bold text-white uppercase">
          Shey.Fit
        </h1>
        <Button variant={"outline"} onClick={() => setOpenSheet(true)}>
          Sign-in
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center h-[80vh] gap-7 mt-20">
        <h1 className="text-6xl font-bold text-center">
          <b className="text-white">shey.</b>
          <b className="text-green-600">Fit</b>
        </h1>
        <p className="text-sm font-semibold text-gray-500">
          A perfect gym for you to get fit and healthy with the best trainers
          and equipment.
        </p>
        <Button variant={"outline"}>Explore Plans</Button>
        <ArrowDownToLine
          size={20}
          color="gray"
          className="animate-bounce cursor-pointer mt-10"
        />
      </div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="lg:min-w-[500px] flex items-center auth-parent">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          {form === "sign-up" ? (
            <SignUp
              routing="hash"
              signInUrl="/?form=sign-in"
              fallbackRedirectUrl={"/account"}
            />
          ) : (
            <SignIn
              routing="hash"
              signUpUrl="/?form=sign-up"
              fallbackRedirectUrl={"/account"}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Homepage;
