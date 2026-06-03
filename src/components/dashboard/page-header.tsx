interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
        {eyebrow}
      </p>
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}
