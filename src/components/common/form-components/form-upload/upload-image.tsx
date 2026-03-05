import { PlusOutlined } from '@ant-design/icons';
import { message, Upload, type GetProp, type UploadProps } from 'antd';

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

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  function beforeUpload(file: FileType) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    if (onChange) {
      getBase64(file, (url) => {
        onChange(url);
      });
    }
    return false;
  }

  return (
    <div>
      <Upload
        name="image-upload"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {value ? (
          <img
            draggable={false}
            src={value}
            alt="avatar"
            style={{ width: '100%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}
