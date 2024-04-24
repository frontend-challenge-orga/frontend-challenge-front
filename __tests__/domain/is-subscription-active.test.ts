import "@testing-library/jest-dom";

import type { Subscription } from "@/domain/models/subscription.model";
import { checkSubscriptionActive } from "@/domain/services/utils/check-subscription-active";

describe("isSubscriptionActive", () => {
  it("should return true if the subscription is active and has no end date", () => {
    const subscription: Subscription = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      subscribed: true,
      subscription_duration: "YEARLY",
      subscribed_at: new Date(),
      subscription_id: "sub_123",
      subscription_end_at: null,
      userId: "user_123",
    };

    const result = checkSubscriptionActive(subscription);

    expect(result).toBe(true);
  });

  it("should return true if the subscription is active and the end date is in the future", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Set to one day in the future

    const subscription: Subscription = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      subscribed: true,
      subscription_duration: "YEARLY",
      subscribed_at: new Date(),
      subscription_id: "sub_123",
      subscription_end_at: null,
      userId: "user_123",
    };

    const result = checkSubscriptionActive(subscription);

    expect(result).toBe(true);
  });

  it("should return false if the subscription is not active", () => {
    const subscription: Subscription = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      subscribed: false,
      subscription_duration: "YEARLY",
      subscribed_at: new Date(),
      subscription_id: "sub_123",
      subscription_end_at: null,
      userId: "user_123",
    };

    const result = checkSubscriptionActive(subscription);

    expect(result).toBe(false);
  });

  it("should return false if the subscription is active but the end date is in the past", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1); // Set to one day in the past

    const subscription: Subscription = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      subscribed: true,
      subscription_duration: "YEARLY",
      subscribed_at: new Date(),
      subscription_end_at: pastDate,
      subscription_id: "sub_123",
      userId: "user_123",
    };

    const result = checkSubscriptionActive(subscription);

    expect(result).toBe(false);
  });
});
