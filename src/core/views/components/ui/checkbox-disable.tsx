import { Checkbox } from "./checkbox";

export function CheckboxDisabled() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms2" disabled />
    </div>
  );
}
