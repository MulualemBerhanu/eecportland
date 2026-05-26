"use client";

import type { LeadershipMember } from "@/data/beliefs";
import { LeadershipTextCard } from "@/components/shared/LeadershipTextCard";

type Props = {
  person: LeadershipMember;
  index: number;
};

/** Portrait layout placeholder — swap for photo cards when `showLeadershipPhotos` is enabled. */
export function LeadershipCard(props: Props) {
  return <LeadershipTextCard {...props} />;
}
