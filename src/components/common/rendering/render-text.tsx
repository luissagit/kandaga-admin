export interface RenderTextProps {
  value?: string;
  className?: string;
}

export function RenderText(props: RenderTextProps): React.ReactNode {
  const value = props?.value ?? '-';
  const className = props?.className ?? '';

  return (
    <div className={`border rounded-md p-2 border-primary-300 ${className}`}>
      {value}
    </div>
  );
}
