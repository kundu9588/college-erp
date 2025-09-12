"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // if you need CSS too
import "react-quill-new/dist/quill.snow.css";
import "jsvectormap/dist/jsvectormap.css";
import "react-toastify/dist/ReactToastify.css";
import "react-modal-video/css/modal-video.min.css";

// JavaScript imports should still be inside useEffect
import { useEffect } from "react";

export default function PluginInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min");
    }
  }, []);
  return null;
}
