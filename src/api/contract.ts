// sets request response contract between the UI and Server

export interface GetUsernameResponse {
  error?: boolean;
  username?: string;
  setupDone?: boolean;
}
