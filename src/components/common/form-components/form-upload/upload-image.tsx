import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Upload, Spin, type GetProp, type UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import { useModuleContext } from '@/context/base-module.context';
import type { BaseService } from '@/services/base.service';
import { useParams } from 'react-router-dom';

export interface UploadImageProps {
  value?: any;
  onChange?(item: any): any;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export function UploadImage(props: UploadImageProps): React.ReactNode {
  const value = props?.value;
  const onChange = props?.onChange;

  const params = useParams();
  const id = params?.id;

  const module = useModuleContext();
  const config = module.config;
  const service = config.service as BaseService<any>;

  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  async function fetchInitialImage(id: string) {
    setLoading(true);
    try {
      const blob = await service.getFile(id);
      const objectUrl = URL.createObjectURL(blob);
      setImageUrl(objectUrl);
      return objectUrl;
    } catch (error) {
      console.error('Gagal load image lama:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let currentObjectUrl: string | undefined;

    if (value && value.startsWith('data:image')) {
      setImageUrl(value);
    } else if (id && typeof id === 'string' && !id.startsWith('data:image')) {
      fetchInitialImage(id).then((url) => {
        currentObjectUrl = url;
      });
    } else {
      setImageUrl(undefined);
    }

    return () => {
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, [id, value]);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  function beforeUpload(file: FileType) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Hanya bisa upload file JPG/PNG!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ukuran gambar harus di bawah 2MB!');
      return false;
    }

    getBase64(file, (url) => {
      setImageUrl(url);
      if (onChange) {
        onChange(url);
      }
    });

    return false;
  }

  return (
    <div className="relative">
      <Upload
        name="image-upload"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {loading && <Spin className="absolute" />}
            <img
              draggable={false}
              src={imageUrl}
              alt="avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className={loading ? 'opacity-50' : ''}
            />
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}
