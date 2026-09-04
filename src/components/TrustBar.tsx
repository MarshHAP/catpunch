import { storeConfig } from "@/store.config";
import { IconRow } from "@/components/IconRow";

export function TrustBar() {
  const { trustBar } = storeConfig;
  if (!trustBar.enabled) return null;
  return (
    <section className="trust-bar">
      <div className="page-width">
        <IconRow items={trustBar.items} variant="trust" />
      </div>
    </section>
  );
}
