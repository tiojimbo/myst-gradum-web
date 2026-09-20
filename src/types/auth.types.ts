export interface User {
  id: string;
  name: string;
  email: string;
  onboardingCompletedAt: string | null;
}
export interface AuthTokens {
  accessToken: string;
}
export interface AuthPayload extends AuthTokens {
  user: User;
}
