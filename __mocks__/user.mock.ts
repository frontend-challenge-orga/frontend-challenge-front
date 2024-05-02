import { faker } from "@faker-js/faker/locale/en";
import type { SessionDTO } from "@/core/infrastructure/dto/session.dto";

class SessionMock implements SessionDTO {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
    role: string;
    points: number;
    subscribed: boolean;
    subscription_duration: string;
    credit_challenge_amount: number;
    credit_design_amount: number;
  };

  constructor() {
    this.user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      id: faker.string.uuid(),
      role: "ADMIN",
      points: 0,
      subscribed: faker.datatype.boolean(),
      subscription_duration: "MONTHLY",
      credit_challenge_amount: 0,
      credit_design_amount: 0,
    };
  }
}

export const SESSION_MOCK: SessionDTO = new SessionMock();
