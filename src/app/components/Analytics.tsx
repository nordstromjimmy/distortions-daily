"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    const loadAnalytics = () => {
      // Plausible Analytics
      const plausibleScript = document.createElement("script");
      plausibleScript.setAttribute("defer", "");
      plausibleScript.setAttribute("data-domain", "distortionsdaily.com");
      plausibleScript.src = "https://plausible.io/js/script.js";
      document.head.appendChild(plausibleScript);

      // Google AdSense
      const adsenseScript = document.createElement("script");
      adsenseScript.setAttribute("async", "");
      adsenseScript.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4372906584866838";
      adsenseScript.crossOrigin = "anonymous";
      document.head.appendChild(adsenseScript);
    };

    if (document.readyState === "complete") {
      loadAnalytics();
    } else {
      window.addEventListener("load", loadAnalytics);
      return () => window.removeEventListener("load", loadAnalytics);
    }
  }, []);

  return null;
}
