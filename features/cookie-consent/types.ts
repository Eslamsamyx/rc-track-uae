export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  personalisation: boolean;
}

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  personalisation: false,
};

export const STORAGE_KEY = "rc-consent-v1";
