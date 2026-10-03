/**
 * APK / Android WebView detection.
 * Browser sessions must never trip this — overlay and login gating stay off.
 */
export function isAndroidApkWebView(): boolean {
  if (typeof window === "undefined") return false;

  const w = window as Window & {
    KwgNative?: unknown;
    __APK_WRAPPER__?: boolean;
  };

  if (w.KwgNative != null || w.__APK_WRAPPER__ === true) return true;

  const params = new URLSearchParams(window.location.search);
  // Native wrapper sets this on purpose. Never set it on the public web URL.
  if (params.get("apk") === "1") return true;

  const ua = navigator.userAgent || "";
  // Android WebView UA contains "; wv)" — Chrome on Android does not.
  const isAndroid = /Android/i.test(ua);
  const isWebView = /\bwv\b/.test(ua) || /AndroidWebView/i.test(ua);
  return isAndroid && isWebView;
}
