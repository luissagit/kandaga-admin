import { FALLBACK_IMAGE } from '@/assets';
import { useModuleContext } from '@/context/base-module.context';
import type { BaseService } from '@/services/base.service';
import { Image, Spin, type ImageProps } from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface RenderImageProps {
  value?: string;
  className?: string;
  imageProps?: ImageProps;
  service?: BaseService<any>;
}

export function RenderImage(props: RenderImageProps): React.ReactNode {
  const params = useParams();
  const id = params?.id;

  const value = id ?? props?.value;
  const className = props?.className;
  const imageProps = props?.imageProps ?? {};

  const module = useModuleContext();
  const config = module.config;
  const service = props?.service ?? (config.service as BaseService<any>);

  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  async function fetchImage() {
    if (!value) return;

    setLoading(true);
    try {
      const blob = await service.getFile(value);
      const objectUrl = URL.createObjectURL(blob);
      setImageUrl(objectUrl);

      return objectUrl;
    } catch (error) {
      console.error('Gagal load image:', error);
      setImageUrl(FALLBACK_IMAGE);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let currentUrl: string | undefined;

    fetchImage().then((url) => {
      currentUrl = url;
    });

    return () => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [value]);

  return (
    <Spin spinning={loading} className={className ?? `!h-[120px] !w-[120px]`}>
      <Image
        src={imageUrl || FALLBACK_IMAGE}
        alt="Icon"
        fallback={FALLBACK_IMAGE}
        className={`${className ?? '!h-[120px] !w-[120px] border border-primary-200 rounded-md object-cover'}`}
        {...imageProps}
      />
    </Spin>
  );
}
