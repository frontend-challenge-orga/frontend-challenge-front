import { ButtonLink } from "@/core/views/components/ui/button-link";
import { URL } from "@/config/constants";
type Props = {
  slug: string;
};

export const SubmitSolutionCta = ({ slug }: Props) => {
  return (
    <div>
      <h3>Submit your first solution</h3>
      <p>
        Once you’ve completed this challenge, click the button below and fill in the form to submit your solution. Not
        sure how to submit? Read our complete guide to submitting solutions.
      </p>

      <ButtonLink href={`${URL.CHALLENGES}/${slug}/solutions/new`}>Submit Solution</ButtonLink>
    </div>
  );
};
