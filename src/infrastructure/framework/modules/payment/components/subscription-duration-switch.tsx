import { SwitchForm } from "@/infrastructure/framework/components/ui/switch-form";
import type { Control } from "react-hook-form";

type Props = {
  control: Control<any>;
};

export const SubscriptionDurationSwitch = ({ control }: Props) => {
  return (
    <div className="flex gap-4">
      <span>Monthly</span>
      <SwitchForm control={control} name="subscription_duration" />
      <span>Yearly</span>
    </div>
  );
};
