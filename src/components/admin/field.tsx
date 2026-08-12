const inputClass =
  "w-full rounded-md border border-border-strong bg-bg px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-fg";

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
      {message}
    </p>
  );
}

export function TextField({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="label-mono block text-fg-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  required,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="label-mono block text-fg-muted">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="label-mono block text-fg-muted">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={inputClass}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label htmlFor={name} className="flex items-center gap-2.5 text-sm text-fg">
      <input
        id={name}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-4 rounded border-border-strong bg-bg accent-fg"
      />
      {label}
    </label>
  );
}
