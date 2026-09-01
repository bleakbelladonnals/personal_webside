export function SystemDiagram({ steps, label }: { steps: string[]; label: string }) {
  return (
    <figure className="system-diagram">
      <figcaption className="sr-only">{label}工作流程</figcaption>
      <div className="diagram-terminal">
        <span className="diagram-light" />
        <p>INPUT</p>
        <strong>{steps[0]}</strong>
      </div>
      <ol>
        {steps.slice(1).map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
            {index < steps.length - 2 ? <i aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}
