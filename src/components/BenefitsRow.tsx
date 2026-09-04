import { storeConfig } from "@/store.config";
import { IconRow } from "@/components/IconRow";

export function BenefitsRow() {
  const { benefitsRow } = storeConfig;
  if (!benefitsRow.enabled) return null;
  return (
    <section className="benefits-row">
      <div className="page-width">
        <IconRow items={benefitsRow.items} variant="benefit" />
      </div>
    </section>
  );
}
