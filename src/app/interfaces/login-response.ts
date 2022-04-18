export interface LoginResponse {
  "wp_user"?: {
    "data"?: {
      "ID"?: string,
      "user_login"?: string,
      "user_nicename"?: string,
      "user_email"?: string,
      "user_url"?: string,
      "user_registered"?: string,
      "user_activation_key"?: string,
      "user_status"?: string,
      "display_name"?: string
    }
  }
  "access_token": string,
  "expires_in": number,
  "refresh_token": string
}
