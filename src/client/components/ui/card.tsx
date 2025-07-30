//==================================
//src/client/components/ui/card.tsx
//==================================

import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white shadow-sm",
        props.className
      )}
      {...props}
    />
  );
}

export function CardContent(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", props.className)} {...props} />;
}
