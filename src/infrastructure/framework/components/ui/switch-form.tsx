import * as React from "react";
import { Switch } from "@/infrastructure/framework/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/infrastructure/framework/components/ui/form";
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
>(({ className, control, name, label, ...props }, ref) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Switch
              className={"block"}
              checked={field.value}
              onCheckedChange={field.onChange}
              ref={ref}
              {...props}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
});

SwitchForm.displayName = "Switch";

export { SwitchForm };
