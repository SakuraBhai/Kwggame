import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Lock, r as Check } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CEwA8TQB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* APK / Android WebView detection.
* Browser sessions must never trip this — overlay and login gating stay off.
*/
function isAndroidApkWebView() {
	if (typeof window === "undefined") return false;
	const w = window;
	if (w.KwgNative != null || w.__APK_WRAPPER__ === true) return true;
	if (new URLSearchParams(window.location.search).get("apk") === "1") return true;
	const ua = navigator.userAgent || "";
	const isAndroid = /Android/i.test(ua);
	const isWebView = /\bwv\b/.test(ua) || /AndroidWebView/i.test(ua);
	return isAndroid && isWebView;
}
var REGISTER_URL = `https://kwg08.com/#/register?invitationCode=943E651356`;
/**
* APK gate store. The web UI never reads this unless the native WebView
* (or an explicit APK shell) mounts the overlay. Initial: signupRequired = true.
*/
var useSignupGate = create()(persist((set) => ({
	signupRequired: true,
	markRegistered: () => set({ signupRequired: false }),
	reset: () => set({ signupRequired: true })
}), { name: "signupRequired" }));
function loginAllowed(signupRequired) {
	return signupRequired === false;
}
/**
* Pointer overlay used only in the Android WebView shell.
* Blocks Login while signupRequired is true; Sign Up stays usable underneath
* when the native WebView loads the live origin (not this overlay-on-iframe).
*/
function ApkLoginOverlay() {
	if (loginAllowed(useSignupGate((s) => s.signupRequired))) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-x-3 top-3 z-50 flex justify-center",
		role: "status",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none flex items-center gap-2 rounded-xl border border-primary/40 bg-bg/95 px-4 py-2.5 text-sm font-semibold text-fg shadow-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
				className: "size-4 text-primary",
				"aria-hidden": true
			}), "Sign up required — Login unlocks after registration."]
		})
	});
}
var DURATION_MS = 4800;
var CHECKS = [
	{
		label: "Identity Verification",
		at: .14
	},
	{
		label: "Server Handshake",
		at: .34
	},
	{
		label: "Encryption Layer",
		at: .58
	},
	{
		label: "Device Trust",
		at: .8
	}
];
var TRACE = [
	38,
	52,
	44,
	70,
	48,
	62,
	40,
	78,
	55,
	68,
	42,
	72
];
function formatClock(date) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
function Panel({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-md border border-border/80 bg-panel/80 ${className}`,
		children
	});
}
function BootHud({ onComplete }) {
	const [now, setNow] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const started = performance.now();
		let frame = 0;
		const tick = (t) => {
			const p = Math.min(1, (t - started) / DURATION_MS);
			setProgress(p);
			if (p < 1) frame = requestAnimationFrame(tick);
			else onComplete();
		};
		frame = requestAnimationFrame(tick);
		setNow(/* @__PURE__ */ new Date());
		const clock = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => {
			cancelAnimationFrame(frame);
			window.clearInterval(clock);
		};
	}, [onComplete]);
	const pct = Math.min(99, Math.round(progress * 100));
	const lock = Math.min(4, 1 + Math.floor(progress * 4));
	const signal = (98.4 + progress * .5).toFixed(1);
	const temp = (42.4 + progress * .5).toFixed(1);
	const bars = (0, import_react.useMemo)(() => TRACE.map((h, i) => ({
		h,
		delay: `${(i * .11).toFixed(2)}s`
	})), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-dvh w-full justify-center overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-70",
				style: { background: "radial-gradient(ellipse at 50% 28%, color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 52%)" },
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hud-scanlines pointer-events-none absolute inset-0 opacity-40",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex h-full w-full max-w-md flex-col px-4 pb-5 pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[1.35rem] font-bold leading-none tracking-wide text-primary",
							children: "1CR HACK APK"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-[10px] tracking-[0.28em] text-muted",
							children: "SECURE SYSTEM ACCESS"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] tracking-[0.18em] text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pulse-dot size-1.5 rounded-full bg-primary",
								style: { animation: "pulse-dot 1.1s ease-in-out infinite" }
							}), "CONNECTING"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "LOCAL TIME",
								value: now ? formatClock(now) : "--:--:--",
								unit: "UTC+5:30"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "SIGNAL INTEGRITY",
								value: signal,
								unit: "%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "CORE TEMP",
								value: temp,
								unit: "°C"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mx-auto mt-2 grid size-[220px] place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { progress })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "px-3 pb-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-center justify-between text-[10px] tracking-[0.22em] text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NEURAL TRACE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "LIVE"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 items-end gap-1",
							children: bars.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bar-live w-full origin-bottom rounded-[1px] bg-primary",
								style: {
									height: `${b.h}%`,
									animation: `bar-live ${1.2 + i % 4 * .15}s ease-in-out ${b.delay} infinite`
								}
							}, i))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							className: "px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between text-[10px] tracking-[0.2em] text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UPLINK" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "STABLE"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 items-end gap-1.5",
								children: [
									32,
									48,
									62,
									78,
									94
								].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-4 rounded-[1px] bg-primary",
									style: {
										height: `${Math.min(h, 20 + progress * 90)}%`,
										opacity: .45 + i * .12
									}
								}, h))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							className: "flex flex-col items-center justify-center px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex w-full items-center justify-between text-[10px] tracking-[0.2em] text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TARGET LOCK" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary",
									children: [String(lock).padStart(2, "0"), " / 04"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, {})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between px-1 text-[10px] tracking-[0.24em] text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-1.5 rounded-full bg-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-1.5 rounded-full bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-1.5 rounded-full bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-1.5 rounded-full bg-border" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SYSTEM_CHECK" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1.5",
						children: CHECKS.map((c) => {
							const ok = progress >= c.at;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: `flex min-h-10 items-center justify-between rounded-lg border px-3 text-sm ${ok ? "border-primary/40 bg-primary/15 text-fg" : "border-border bg-surface/60 text-muted"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `grid size-5 place-items-center rounded-full border ${ok ? "border-primary bg-primary text-bg" : "border-muted"}`,
										children: ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											className: "size-3",
											strokeWidth: 3
										}) : null
									}), c.label]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] tracking-[0.18em]",
									children: ok ? "OK" : "PENDING"
								})]
							}, c.label);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex items-end justify-between text-[10px] tracking-[0.22em]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "INITIALIZING CORE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xl font-bold leading-none text-primary",
								children: [pct, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 overflow-hidden rounded-full bg-surface",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary",
								style: { width: `${pct}%` }
							})
						})]
					})
				]
			})
		]
	});
}
function Stat({ label, value, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "px-2 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[9px] tracking-[0.18em] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-[15px] font-bold leading-none text-primary",
			children: [value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 text-[9px] font-normal text-muted",
				children: unit
			})]
		})]
	});
}
function Radar({ progress }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative size-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border border-primary/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[12%] rounded-full border border-dashed border-primary/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[28%] rounded-full border border-primary/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 rounded-full",
				style: {
					background: "repeating-conic-gradient(from 0deg, rgb(125 255 42 / 0.12) 0 6deg, transparent 6deg 12deg)",
					maskImage: "radial-gradient(circle, transparent 54%, black 55%, black 57%, transparent 58%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "radar-sweep absolute inset-[8%] rounded-full",
				style: {
					background: "conic-gradient(from 0deg, transparent 0deg, rgb(125 255 42 / 0.0) 240deg, rgb(125 255 42 / 0.55) 300deg, rgb(125 255 42 / 0.85) 360deg)",
					animation: "radar-sweep 3.2s linear infinite"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_18px_var(--color-primary)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-[62%] top-[28%] size-1.5 rounded-full bg-primary",
				style: { opacity: .4 + progress * .6 }
			})
		]
	});
}
function Crosshair() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative size-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border border-primary/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" })
		]
	});
}
function SiteFrame() {
	const [booted, setBooted] = (0, import_react.useState)(false);
	const finishBoot = (0, import_react.useCallback)(() => {
		setBooted(true);
		if (typeof window === "undefined") return;
		if (isAndroidApkWebView()) window.location.replace(REGISTER_URL);
	}, []);
	if (!booted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootHud, { onComplete: finishBoot });
	const apk = isAndroidApkWebView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-bg",
		children: [apk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApkLoginOverlay, {}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: "KWG Game",
			src: REGISTER_URL,
			className: "absolute inset-0 h-full w-full border-0 bg-bg",
			allow: "clipboard-write; payment; fullscreen",
			referrerPolicy: "strict-origin-when-cross-origin"
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFrame, {});
}
//#endregion
export { Home as component };
