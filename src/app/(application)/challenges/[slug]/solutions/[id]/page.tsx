import { challengeSolutionService } from "@/core/infrastructure/services/challenge.solution.service";
import { feedbackService } from "@/core/infrastructure/services/feedback.service";
import { ChallengeFeedbackForm } from "@/core/views/modules/challenge/forms/challenge-feedback-form";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

export default async function ChallengeSolutionPage({ params }: Props) {
  const solution = await challengeSolutionService.findByChallengeId(params.id);
  const feedbacks = await feedbackService.getFeedbacks(params.id);

  if (!solution) {
    return <div>Not found</div>;
  }

  return (
    <div>
      {feedbacks?.map((feedback) => (
        <div key={feedback.id}>
          <p>{feedback.comment}</p>
        </div>
      ))}

      <ChallengeFeedbackForm solutionId={solution.id} slug={params.slug} />
    </div>
  );
}
