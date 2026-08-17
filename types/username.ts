/**
 * Username validation and availability state
 */
export type UsernameState = {
  value: string;
  isValid: boolean;
  isChecking: boolean;
  isAvailable: boolean | null;
  error: string | null;
};

/**
 * API response for username availability check
 */
export type CheckUsernameResponse = {
  available: boolean;
  message?: string;
};
