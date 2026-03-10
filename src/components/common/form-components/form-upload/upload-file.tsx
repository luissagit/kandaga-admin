import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, type GetProp, type UploadProps } from 'antd';
import { useEffect, useState } from 'react';

export interface UploadFileProps {
  value?: any;
  onChange?(item: any): any;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export function UploadFile(props: UploadFileProps): React.ReactNode {
  const value = props?.value;
  const onChange = props?.onChange;

  const [fileList, setFileList] = useState<any[]>([]);

  function beforeUpload(file: FileType) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('Kamu hanya bisa mengunggah file PDF!');
      return Upload.LIST_IGNORE; // Mengabaikan file jika bukan PDF
    }
    if (!isLt2M) {
      message.error('Document must smaller than 2MB!');
    }
    if (onChange) {
      getBase64(file, (url) => {
        onChange(url);
      });
    }
    return false;
  }

  function onRemove() {
    if (onChange) {
      onChange(null);
      setFileList([]);
    }
  }

  useEffect(() => {
    if (value && typeof value === 'string') {
      setFileList([
        {
          uid: '1',
          name: 'Document',
          status: 'done',
          url: value,
        },
      ]);
    }
  }, [value]);

  return (
    <div>
      <Upload
        maxCount={1}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onRemove={onRemove}
        accept=".pdf,application/pdf"
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </div>
  );
}
