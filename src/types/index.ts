export interface IButtonType {
  clientId: string;
  redirectUri?: string;
  scope?: string;
  disableMobileRedirect: boolean;
  onSuccess: (code: string) => void;
  onFailure: (code: string) => void;
  isMobile: boolean;
  state: string;
  responseType?: string;
}
