"use client";

import { useEffect } from "react";
import { installContentProtection } from "@/lib/contentProtection";

export default function ContentProtection() {
  useEffect(() => installContentProtection(document), []);
  return null;
}
