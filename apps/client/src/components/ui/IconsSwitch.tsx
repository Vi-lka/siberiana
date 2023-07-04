import React from "react";
import {
  BarChart4,
  Boxes,
  CircuitBoard,
  FileBadge2,
  HelpingHand,
  Landmark,
  Library,
  ScrollText,
  Users,
} from "lucide-react";

export default function Icons({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  switch (icon) {
    case "Library":
      return <Library className={className} />;

    case "Users":
      return <Users className={className} />;

    case "Landmark":
      return <Landmark className={className} />;

    case "FileBadge2":
      return <FileBadge2 className={className} />;

    case "HelpingHand":
      return <HelpingHand className={className} />;

    case "Boxes":
      return <Boxes className={className} />;

    case "BarChart4":
      return <BarChart4 className={className} />;

    case "ScrollText":
      return <ScrollText className={className} />;

    case "CircuitBoard":
      return <CircuitBoard className={className} />;

    default:
      return icon;
  }
}
