export interface SessionDTO {
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
}
