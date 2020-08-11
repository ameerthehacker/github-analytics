// sets request response contract between the UI and Server

export interface GetUsernameResponse {
  error?: boolean;
  username?: string;
  setupDone?: boolean;
}

export interface SetupUserRequest {
  fullName: string;
  password: string;
}

export interface SetupUserResponse {
  error?: boolean;
  token?: string;
}

export interface LoginWithPasswordRequest {
  password: string;
}

export interface LoginWithPasswordResponse {
  token?: string;
  error?: boolean;
  isAuthenticated: boolean;
}
