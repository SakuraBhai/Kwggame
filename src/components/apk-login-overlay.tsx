import { Lock } from "lucide-react";
import { loginAllowed, useSignupGate } from "@/lib/signup-gate";

/**
 * Pointer overlay used only in the Android WebView shell.
 * Blocks Login while signupRequired is true; Sign Up stays usable underneath
 * when the native WebView loads the live origin (not this overlay-on-iframe).
 */
export function ApkLoginOverlay() {
  const signupRequired = useSignupGate((s) => s.signupRequired);
  if (loginAllowed(signupRequired)) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-3 top-3 z-50 flex justify-center"
      role="status"
    >
      <div className="pointer-events-none flex items-center gap-2 rounded-xl border border-primary/40 bg-bg/95 px-4 py-2.5 text-sm font-semibold text-fg shadow-lg">
        <Lock className="size-4 text-primary" aria-hidden />
        Sign up required — Login unlocks after registration.
      </div>
    </div>
  );
}
