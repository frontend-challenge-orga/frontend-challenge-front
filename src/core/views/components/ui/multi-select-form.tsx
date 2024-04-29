import * as React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/views/components/ui/form";
import type { Control } from "react-hook-form";
import { MultiSelect } from "@/core/views/components/ui/multi-select";

interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  control: Control<any>;
  name: string;
  options: { label: string; value: string }[];
  label: string;
}

export function MultiSelectForm({
  control,
  name,
  label,
  options,
  ...props
}: SelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <MultiSelect options={options} selected={field.value} {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
