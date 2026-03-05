export interface RenderTextProps {
  value?: string;
  className?: string;
  customRender?(value: any): string;
}

export function RenderText(props: RenderTextProps): React.ReactNode {
  const value = props?.value ?? '-';
  const className = props?.className ?? '';
  const customRender = props?.customRender;

  const text = customRender ? customRender(value) : value;

  return (
    <div className={`border-b px-0 border-primary-300 ${className}`}>
      {text}
    </div>
  );
}
