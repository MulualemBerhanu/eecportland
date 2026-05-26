"use client";

import { useEffect } from "react";
import {
  clearMembershipDraftStorage,
  markReturningFromBylawsToMembers,
  shouldKeepDraftOnMembersUnmount,
} from "@/lib/membership-draft-storage";

/** Clears the membership draft when leaving bylaws unless returning to /members. */
export function BylawsDraftLifecycle() {
  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const path = href.split("?")[0]?.split("#")[0] ?? href;
      if (path === "/members") {
        markReturningFromBylawsToMembers();
      }
    };

    document.addEventListener("click", onClickCapture, true);
    return () => {
      document.removeEventListener("click", onClickCapture, true);
      if (shouldKeepDraftOnMembersUnmount()) return;
      clearMembershipDraftStorage();
    };
  }, []);

  return null;
}
