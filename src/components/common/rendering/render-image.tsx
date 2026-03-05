import { FALLBACK_IMAGE } from '@/assets';
import { Image } from 'antd';
import type React from 'react';

export interface RenderImageProps {
  value?: string;
}

export function RenderImage(props: RenderImageProps): React.ReactNode {
  const value = props.value;

  return (
    <Image
      src={value}
      alt="Icon"
      fallback={FALLBACK_IMAGE}
      className="!h-[120px] !w-[120px] border border-primary-200 rounded-md object-cover"
    />
  );
}
