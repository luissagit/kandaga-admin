import { Button } from 'antd';
import type React from 'react';
import { PiArrowSquareOutBold } from 'react-icons/pi';

export interface RenderButtonUrlProps {
  value?: string;
  label?: string;
}

export function RenderButtonUrl(props: RenderButtonUrlProps): React.ReactNode {
  const value = props?.value;
  const label = props?.label ?? 'Open Document';

  function onClickDocument() {
    window.open(value, '_blank', 'noopener,noreferrer');
  }

  return (
    <Button onClick={onClickDocument} icon={<PiArrowSquareOutBold />}>
      {label}
    </Button>
  );
}
