import { useState } from "react";
import { AuthSheet } from "@/components/auth-sheet";
import { BootHud } from "@/components/boot-hud";
import { RedOrb } from "@/components/red-orb";

export function SiteFrame() {
  const [sheet, setSheet] = useState(false);

  return (
    <div className="relative h-dvh overflow-hidden">
      <BootHud />
      <RedOrb onOpen={() => setSheet(true)} />
      {sheet ? <AuthSheet onHide={() => setSheet(false)} /> : null}
    </div>
  );
}
