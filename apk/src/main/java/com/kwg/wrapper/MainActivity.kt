package com.kwg.wrapper

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

/**
 * APK-ONLY shell.
 *
 * Do NOT point this WebView at the published web app (that iframe must stay
 * unmodified for browsers). Load the live site as the top-level document so
 * JavaScript injection can run on kwg08.com.
 *
 * Files to keep in the Android project:
 *   - this MainActivity
 *   - src/main/assets/apk-gate.js  (copy of public/apk-gate.js)
 *   - AndroidManifest.xml INTERNET permission
 *
 * State: signupRequired starts true; flips false after a successful register
 * navigation (persisted in the site origin's localStorage + SharedPreferences).
 */
class MainActivity : AppCompatActivity() {

    companion object {
        const val TARGET =
            "https://kwg08.com/#/register?invitationCode=943E651356"
        const val PREFS = "kwg_gate"
        const val KEY_SIGNUP_REQUIRED = "signupRequired"
    }

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        webView = WebView(this)
        setContentView(webView)

        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true

        webView.addJavascriptInterface(KwgBridge(), "KwgNative")
        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest,
            ): Boolean {
                val url = request.url.toString()
                if (isSignupRequired() && looksLikeLogin(url)) {
                    view.loadUrl(TARGET)
                    return true
                }
                return false
            }

            override fun onPageFinished(view: WebView, url: String) {
                injectGate(view)
            }
        }

        webView.loadUrl(TARGET)
    }

    private fun isSignupRequired(): Boolean {
        return getSharedPreferences(PREFS, MODE_PRIVATE)
            .getBoolean(KEY_SIGNUP_REQUIRED, true)
    }

    private fun looksLikeLogin(url: String): Boolean {
        val lower = url.lowercase()
        return lower.contains("login") || lower.contains("signin") ||
            lower.contains("sign-in")
    }

    private fun injectGate(view: WebView) {
        val js = assets.open("apk-gate.js").bufferedReader().use { it.readText() }
        view.evaluateJavascript(js, null)
        view.evaluateJavascript("window.__APK_WRAPPER__ = true;", null)
    }

    inner class KwgBridge {
        @JavascriptInterface
        fun setSignupRequired(value: Boolean) {
            getSharedPreferences(PREFS, MODE_PRIVATE)
                .edit()
                .putBoolean(KEY_SIGNUP_REQUIRED, value)
                .apply()
        }
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (this::webView.isInitialized && webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
