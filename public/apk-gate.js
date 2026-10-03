/**
 * APK-only gate. Injected by the native WebView into https://kwg08.com
 * (same document as the live site). Never loaded by the browser web app.
 *
 * State:
 *   signupRequired = true  (initial)
 *   signupRequired = false (after a successful registration navigation)
 *
 * Login routes / login controls stay blocked until signupRequired is false.
 */
(function kwgApkGate() {
  if (window.__KWG_APK_GATE__) return;
  window.__KWG_APK_GATE__ = true;

  var STORAGE_KEY = "signupRequired";
  var INVITE = "943E651356";
  var REGISTER_HASH = "#/register?invitationCode=" + INVITE;

  function readSignupRequired() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === null || raw === "") return true;
      return raw !== "false";
    } catch (e) {
      return true;
    }
  }

  function writeSignupRequired(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
    } catch (e) {
      /* ignore quota / private mode */
    }
    var native = window.KwgNative;
    if (native && typeof native.setSignupRequired === "function") {
      try {
        native.setSignupRequired(value);
      } catch (e2) {
        /* native bridge optional */
      }
    }
  }

  var signupRequired = readSignupRequired();

  function pathFromLocation() {
    var hash = window.location.hash || "";
    var path = hash.replace(/^#/, "").split("?")[0].toLowerCase();
    if (path.charAt(0) !== "/") path = "/" + path;
    return path;
  }

  function isLoginRoute(path) {
    return /(^|\/)(login|log-in|signin|sign-in)(\/|$)/.test(path);
  }

  function isRegisterRoute(path) {
    return /(^|\/)(register|signup|sign-up|regist)(\/|$)/.test(path);
  }

  function isPostAuthRoute(path) {
    if (isLoginRoute(path) || isRegisterRoute(path)) return false;
    if (path === "/" || path === "") return true;
    return /(home|main|index|lobby|wallet|mine|user|game|activity|hall|dashboard)/.test(
      path,
    );
  }

  function forceRegister() {
    var next = window.location.pathname + window.location.search + REGISTER_HASH;
    if (window.location.hash.indexOf("/register") === -1) {
      window.location.replace(next);
    }
    showBanner();
  }

  function onNav() {
    var path = pathFromLocation();
    if (signupRequired && isLoginRoute(path)) {
      forceRegister();
      return;
    }
    if (signupRequired && isPostAuthRoute(path)) {
      signupRequired = false;
      writeSignupRequired(false);
      hideBanner();
    }
  }

  var push = window.history.pushState;
  window.history.pushState = function () {
    var result = push.apply(this, arguments);
    onNav();
    return result;
  };
  var replace = window.history.replaceState;
  window.history.replaceState = function () {
    var result = replace.apply(this, arguments);
    onNav();
    return result;
  };

  window.addEventListener("hashchange", onNav);
  window.addEventListener("popstate", onNav);

  document.addEventListener(
    "click",
    function (event) {
      if (!signupRequired) return;
      var node = event.target;
      if (!node || !node.closest) return;
      var el = node.closest("a, button, [role='button']");
      if (!el) return;
      var blob =
        String(el.innerText || el.textContent || "") +
        " " +
        String(el.getAttribute("href") || el.href || "") +
        " " +
        String(el.getAttribute("aria-label") || "");
      var looksLogin = /log\s*in|sign\s*in|signin/i.test(blob);
      var looksSignup = /sign\s*up|register|invitation/i.test(blob);
      if (looksLogin && !looksSignup) {
        event.preventDefault();
        event.stopPropagation();
        forceRegister();
      }
    },
    true,
  );

  var banner;

  function showBanner() {
    if (!signupRequired) return;
    if (banner && banner.parentNode) {
      banner.style.display = "flex";
      return;
    }
    banner = document.createElement("div");
    banner.setAttribute("data-apk-gate", "banner");
    banner.style.cssText =
      "position:fixed;left:12px;right:12px;top:12px;z-index:2147483646;" +
      "display:flex;align-items:center;justify-content:center;gap:8px;" +
      "padding:10px 14px;border-radius:12px;pointer-events:none;" +
      "background:rgba(8,8,8,0.92);color:#f4ead2;font:600 13px/1.4 system-ui,sans-serif;" +
      "border:1px solid rgba(212,175,55,0.45);box-shadow:0 8px 24px rgba(0,0,0,.45);";
    banner.textContent =
      "Sign up required — Login unlocks after you finish registration.";
    document.documentElement.appendChild(banner);
  }

  function hideBanner() {
    if (banner) banner.style.display = "none";
  }

  if (signupRequired) showBanner();

  setInterval(onNav, 350);
  onNav();

  window.__apkGate = {
    get signupRequired() {
      return signupRequired;
    },
    markRegistered: function () {
      signupRequired = false;
      writeSignupRequired(false);
      hideBanner();
    },
  };
})();
