import { useCallback, useState } from "react";
import { isAndroidApkWebView } from "@/lib/apk-env";
import { REGISTER_URL } from "@/lib/site";
import { ApkLoginOverlay } from "@/components/apk-login-overlay";
import { BootHud } from "@/components/boot-hud";

export function SiteFrame() {
  const [booted, setBooted] = useState(false);

  const finishBoot = useCallback(() => {
    setBooted(true);
    if (typeof window === "undefined") return;
    if (isAndroidApkWebView()) {
      window.location.replace(REGISTER_URL);
    }
  }, []);

  if (!booted) {
    return <BootHud onComplete={finishBoot} />;
  }

  const apk = isAndroidApkWebView();

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-bg">
      {apk ? <ApkLoginOverlay /> : null}
      <iframe
        title="KWG Game"
        src={REGISTER_URL}
        className="absolute inset-0 h-full w-full border-0 bg-bg"
        allow="clipboard-write; payment; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </main>
  );
}
