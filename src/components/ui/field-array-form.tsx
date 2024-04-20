import * as React from "react";
import { InputForm } from "@/components/ui/input-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import type {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  ArrayPath,
  FieldArray,
} from "react-hook-form";

export interface Props<TFieldArrayValue extends Record<string, any>> {
  control: Control<any>;
  fields: FieldArrayWithId<any>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldArrayValue, ArrayPath<TFieldArrayValue>>;
  name: string;
  createNewItem: () => FieldArray<
    TFieldArrayValue,
    ArrayPath<TFieldArrayValue>
  >;
}

export const FieldArrayForm = <TFieldArrayValue extends Record<string, any>>(
  props: Props<TFieldArrayValue>,
) => {
  const { control, fields, remove, append, name, createNewItem } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4">
              <FormControl>
                <InputForm
                  control={control}
                  name={`${name}.${index}.value`}
                  label="Value"
                />
              </FormControl>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append(createNewItem())}
            className="text-blue-500"
          >
            Add
          </button>
        </FormItem>
      )}
    />
  );
};
