import { Tag } from 'antd';

export interface RenderStatusProps {
  value: string;
}

function generateColorStatus(value: string) {
  if (value === 'active') return 'green';
}

export function renderStatus(props: RenderStatusProps): React.ReactNode {
  const value = props?.value;
  const color = generateColorStatus(value);

  return (
    <Tag key={color} color={color} variant={'filled'}>
      {value}
    </Tag>
  );
}
