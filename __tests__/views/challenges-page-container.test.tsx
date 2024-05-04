import { ChallengesPageContainer } from "@/core/views/modules/challenge/pages/challenges-page-container";
import { render, screen } from "@testing-library/react";
import { CHALLENGES_MOCK } from "../../__mocks__/challenge.mock";
import { SESSION_MOCK } from "../../__mocks__/user.mock";

const getServerAuthSessionMock = jest.fn().mockReturnValue(SESSION_MOCK);

const getChallengesMock = jest.fn().mockReturnValue(CHALLENGES_MOCK);

const getCompletedChallengesMock = jest.fn().mockReturnValue([]);

describe.skip(ChallengesPageContainer.name, () => {
  test("the page render correctly", async () => {
    const serverComponent = await ChallengesPageContainer({
      getChallenges: getChallengesMock,
      getServerAuthSession: getServerAuthSessionMock,
      getCompletedChallenges: jest.fn(),
    });

    render(serverComponent);
  });

  test("it displays the right number of challenges", async () => {
    const serverComponent = await ChallengesPageContainer({
      getChallenges: getChallengesMock,
      getServerAuthSession: getServerAuthSessionMock,
      getCompletedChallenges: getCompletedChallengesMock,
    });

    render(serverComponent);

    expect(screen.getAllByTestId("challenge")).toHaveLength(CHALLENGES_MOCK.length);
  });
});
