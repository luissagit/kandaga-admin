import { useModuleContext } from '@/context/base-module.context';
import { Button, Drawer, Form, type DrawerProps } from 'antd';
import { useEffect, useState } from 'react';

export interface DrawerFilterProps extends DrawerProps {
  handleConfirm(payload: any): Promise<any>;
  handleCancel(): void;
  children?: React.ReactNode;
}

export function DrawerFilter(props: DrawerFilterProps) {
  const children = props?.children;
  const handleConfirm = props?.handleConfirm;
  const handleCancel = props?.handleCancel;

  const module = useModuleContext();
  const config = module?.config;
  const filterDataIndex = module.filterDataIndex;

  const title = config?.subModuleTitle;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  async function onClickConfirm() {
    const payload = form.getFieldsValue();
    setLoading(true);
    if (handleConfirm) {
      await handleConfirm(payload);
    }
    setLoading(false);
  }

  async function onClickReset() {
    const payload = {};
    setLoading(true);
    if (handleConfirm) {
      await handleConfirm(payload);
    }
    setLoading(false);
    form.resetFields();
  }

  function generateDefaultData() {
    if (filterDataIndex) {
      form.setFieldsValue(filterDataIndex);
    }
  }

  useEffect(() => {
    if (props?.open) {
      generateDefaultData();
    }
  }, [props?.open]);

  return (
    <Drawer
      title={`Filter Data ${title}`}
      destroyOnHidden
      closable
      onClose={handleCancel}
      mask={{
        closable: true,
      }}
      {...props}
      footer={[
        <div className="flex gap-2">
          <Button type="primary" loading={loading} onClick={onClickConfirm}>
            Filter
          </Button>
          <Button danger loading={loading} onClick={onClickReset}>
            Reset
          </Button>
          <Button disabled={loading} onClick={handleCancel}>
            Cancel
          </Button>
        </div>,
      ]}
    >
      <Form form={form} layout="vertical">
        {children}
      </Form>
    </Drawer>
  );
}
