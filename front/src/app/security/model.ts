export interface SignInPayload {
  username: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  password: string;
  mail: string;
}

export interface Credential {
  credential_id: string;
  username: string;
  mail: string;
  isAdmin: boolean;
  active: boolean;
}

export interface Session {
  token: string;
  credential: Credential;
}
