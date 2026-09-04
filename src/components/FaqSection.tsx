import { storeConfig } from "@/store.config";
import { Accordion } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";

export function FaqSection() {
  const { heading, items } = storeConfig.faq;
  if (items.length === 0) return null;
  return (
    <Reveal as="section" className="section faq">
      <div className="faq__wrapper">
        <div className="faq__narrow">
          <h2 className="faq__heading h1 reveal__item">{heading}</h2>
          <div className="reveal__item">
            {items.map((item) => (
              <Accordion key={item.question} title={item.question} html={item.answerHtml} />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
