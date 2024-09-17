import React, { useState, ForwardedRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { InputProps } from "@/types/input";

const CInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { icons, iconPos, id, label, error, ...props },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isActive, setActive] = useState<boolean>(false);

    return (
      <div className="flex flex-col w-full items-start gap-1.5">
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className="w-full flex justify-center items-center gap-1 rounded-md border px-2">
          <Input
            id={id}
            ref={ref}
            {...props}
            type={
              props.type === "password"
                ? isActive
                  ? "text"
                  : "password"
                : props.type
            }
            className="rounded-[inherit] bg-inherit order-2 border-none p-0"
          />

          {icons && (
            <Button
              type="button"
              className={`${
                iconPos === "LEFT" ? "order-1" : "order-3"
              } hover:bg-transparent`}
              size="icon"
              onClick={() => setActive((prev) => !prev)}
              variant="ghost"
            >
              {isActive ? icons.open : icons.close}
            </Button>
          )}
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

CInput.displayName = "CInput";

export default CInput;
