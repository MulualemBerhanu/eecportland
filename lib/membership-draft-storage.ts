export const MEMBERSHIP_DRAFT_KEY = "eec-membership-form-draft";
export const BYLAWS_RETURN_KEY = "eec-membership-from-bylaws";
const DRAFT_VERSION = 1 as const;

export function markLeavingMembersForBylaws() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BYLAWS_RETURN_KEY, "1");
}

/** Call before navigating from bylaws back to the membership form. */
export function markReturningFromBylawsToMembers() {
  markLeavingMembersForBylaws();
}

export function isReturningFromBylaws() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(BYLAWS_RETURN_KEY) === "1";
}

export function consumeBylawsReturnFlag() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(BYLAWS_RETURN_KEY);
}

export function shouldKeepDraftOnMembersUnmount() {
  return isReturningFromBylaws();
}

import type { MembershipFormState } from "@/lib/membership/types";

export function loadMembershipDraft(): {
  step: number;
  data: Partial<MembershipFormState>;
  finalBylawAccepted: boolean;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(MEMBERSHIP_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      v?: number;
      step?: number;
      data?: Record<string, string>;
      finalBylawAccepted?: boolean;
    };
    if (parsed.v !== DRAFT_VERSION || typeof parsed.step !== "number" || !parsed.data) {
      return null;
    }
    return {
      step: Math.min(4, Math.max(0, parsed.step)),
      data: parsed.data as Partial<MembershipFormState>,
      finalBylawAccepted: Boolean(parsed.finalBylawAccepted),
    };
  } catch {
    return null;
  }
}

export function saveMembershipDraft(payload: {
  step: number;
  data: MembershipFormState;
  finalBylawAccepted: boolean;
}) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      MEMBERSHIP_DRAFT_KEY,
      JSON.stringify({ v: DRAFT_VERSION, ...payload }),
    );
  } catch {
    /* quota / private mode */
  }
}

export function clearMembershipDraftStorage() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(MEMBERSHIP_DRAFT_KEY);
    sessionStorage.removeItem(BYLAWS_RETURN_KEY);
  } catch {
    /* ignore */
  }
}
