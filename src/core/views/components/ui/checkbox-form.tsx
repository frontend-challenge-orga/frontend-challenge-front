"use client";

import * as React from "react";
import { Checkbox } from "./checkbox";
import { FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from "./form";
import type { Control } from "react-hook-form";

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
        name="checkbox"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
            <FormControl>
              <Checkbox checked={field.value} ref={ref} onCheckedChange={field.onChange} {...props} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Check the preview before submitting</FormLabel>
            </div>
          </FormItem>
        )}
      />
    );
  },
);

CheckboxForm.displayName = "Checkbox";

export { CheckboxForm };
