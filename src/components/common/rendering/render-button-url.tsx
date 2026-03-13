import { Button } from 'antd';
import type React from 'react';
import { PiArrowSquareOutBold } from 'react-icons/pi';
import { useParams } from 'react-router-dom';

export interface RenderButtonUrlProps {
  value?: string;
  label?: string;
}

export function RenderButtonUrl(props: RenderButtonUrlProps): React.ReactNode {
  const params = useParams();
  const id = params?.id;

  const value = id ?? props?.value;
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
