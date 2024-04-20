import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { FormField } from "@/components/ui/form";
import type { Control } from "react-hook-form";

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLButtonElement> {
  control: Control<any>;
  name: string;
  label?: string;
}

const SwitchForm = React.forwardRef<
  HTMLButtonElement,
  Omit<SwitchProps, "type">
>(({ control, name, label, ...props }, ref) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          ref={ref}
          {...props}
        />
      )}
    />
  );
});

SwitchForm.displayName = "Switch";

export { SwitchForm };
