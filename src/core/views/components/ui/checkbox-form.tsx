"use client";

import * as React from "react";
import { Checkbox } from "./checkbox";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./form";
import type { Control } from "react-hook-form";
import { cn } from "@/config/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  control: Control<any>;
  className?: string;
  name: string;
  label?: string;
}

const CheckboxForm = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, label, control, name, type, ...props }, ref) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0 p-4", className)}>
            <FormControl>
              <Checkbox checked={field.value} ref={ref} onCheckedChange={field.onChange} {...props} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{label}</FormLabel>
            </div>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    );
  },
);

CheckboxForm.displayName = "Checkbox";

export { CheckboxForm };
