import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SIGNUP_STORAGE_KEY } from "@/lib/site";

type GateState = {
  signupRequired: boolean;
  markRegistered: () => void;
  reset: () => void;
};

/**
 * APK gate store. The web UI never reads this unless the native WebView
 * (or an explicit APK shell) mounts the overlay. Initial: signupRequired = true.
 */
export const useSignupGate = create<GateState>()(
  persist(
    (set) => ({
      signupRequired: true,
      markRegistered: () => set({ signupRequired: false }),
      reset: () => set({ signupRequired: true }),
    }),
    { name: SIGNUP_STORAGE_KEY },
  ),
);

export function loginAllowed(signupRequired: boolean): boolean {
  return signupRequired === false;
}
