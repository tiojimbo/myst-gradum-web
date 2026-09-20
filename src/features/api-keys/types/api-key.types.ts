export interface ApiKey {
  id: string;
  name: string;
  keySuffix: string;
  createdAt: string;
  revokedAt: string | null;
}
export interface CreatedApiKey {
  apiKey: ApiKey;
  key: string;
}
