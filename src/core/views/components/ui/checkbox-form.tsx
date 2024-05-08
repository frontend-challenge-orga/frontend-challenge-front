"use client";

import * as React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./form";
import type { Control } from "react-hook-form";
import { cn } from "@/config/utils";
import { Checkbox } from "./checkbox";
import { CheckboxDisabled } from "./checkbox-disable";
import { useCheckboxState } from "../../modules/admin/stores/useCheckboxState";

export interface CheckboxFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  name: string;
  label?: string;
  control: Control<any>;
}

// RAS ici, toujours appel de l'état pour savoir si true ou false mais sans props

const CheckboxForm = React.forwardRef<HTMLButtonElement, CheckboxFormProps>(
  ({ className, name, label, control, ...props }, ref) => {
    // Appel du store
    const { previewOpen } = useCheckboxState();

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0 p-4", className)}>
            {previewOpen && (
              <FormControl>
                <Checkbox checked={field.value} ref={ref} onCheckedChange={field.onChange} {...props} />
              </FormControl>
            )}
            {!previewOpen && (
              <FormControl>
                <CheckboxDisabled />
              </FormControl>
            )}
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
