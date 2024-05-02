import { ChallengesPageContainer } from "@/core/views/modules/challenge/pages/challenges-page-container";
import { render, screen } from "@testing-library/react";

const getServerAuthSessionMock = jest.fn().mockReturnValue({
  user: {
    name: "Huy TRUONG",
    email: "belkross.contact@gmail.com",
    image: "https://avatars.githubusercontent.com/u/52537315?v=4",
    id: "clvpki6no0000rg60wa0fuki7",
    role: "ADMIN",
    points: 0,
    subscribed: undefined,
    subscription_duration: undefined,
    credit_challenge_amount: 0,
    credit_design_amount: 0,
  },
});

const CHALLENGES_MOCK = [
  {
    id: "string",
    name: "premier challenge",
    slug: "string",
    description: "string",
    language: "HTML_CSS",
    difficulty: "NEWBIE",
    points: 1,
    brief: "string",
    tips: "string",
    assets_presentation: ["a", "b"],
    premium: true,
    starter_code_path_file: "string",
    starter_figma_path_file: "string",
    createdById: "string",
  },
  {
    id: "string2",
    name: "premier challenge",
    slug: "string",
    description: "string",
    language: "HTML_CSS",
    difficulty: "NEWBIE",
    points: 1,
    brief: "string",
    tips: "string",
    assets_presentation: ["a", "b"],
    premium: true,
    starter_code_path_file: "string",
    starter_figma_path_file: "string",
    createdById: "string",
  },
];
const getChallengesMock = jest.fn().mockReturnValue(CHALLENGES_MOCK);

describe(ChallengesPageContainer.name, () => {
  test("the page render correctly", async () => {
    const serverComponent = await ChallengesPageContainer({
      getChallenges: getChallengesMock,
      getServerAuthSession: getServerAuthSessionMock,
    });

    render(serverComponent);
  });

  test("it displays the right number of challenges", async () => {
    const serverComponent = await ChallengesPageContainer({
      getChallenges: getChallengesMock,
      getServerAuthSession: getServerAuthSessionMock,
    });

    render(serverComponent);

    expect(screen.getAllByTestId("challenge")).toHaveLength(
      CHALLENGES_MOCK.length,
    );
  });
});
