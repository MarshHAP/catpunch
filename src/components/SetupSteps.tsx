import { storeConfig } from "@/store.config";

export function SetupSteps() {
  const { heading, subheading, steps } = storeConfig.setupSteps;
  if (steps.length === 0) return null;
  return (
    <section className="setup">
      <div className="setup__container">
        <div className="setup__header">
          <h2 className="setup__heading">{heading}</h2>
          <p className="setup__subheading">{subheading}</p>
        </div>
        <div className="setup__cards">
          {steps.map((s) => (
            <div className="setup__card" key={s.title}>
              <h3 className="setup__card-heading">{s.title}</h3>
              <div className="setup__card-body">
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
