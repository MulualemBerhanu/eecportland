"use client";

import { CTALink } from "@/components/shared/CTAButton";
import { markReturningFromBylawsToMembers } from "@/lib/membership-draft-storage";

export function BylawsBackToFormLink() {
  return (
    <CTALink
      href="/members"
      variant="secondary"
      size="md"
      className="w-full justify-center sm:inline-flex sm:w-auto sm:min-w-[260px]"
      onClick={markReturningFromBylawsToMembers}
    >
      Back to the form
    </CTALink>
  );
}
