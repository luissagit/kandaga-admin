import { Button, Modal, type ModalProps } from 'antd';
import { useState } from 'react';

export interface ConfirmationModalProps extends ModalProps {
  item: any;
  title: string;
  description: string;
  handleConfirm(payload: any): Promise<any>;
  handleCancel(): void;

  danger?: boolean;
}

export function ConfirmationModal(props: ConfirmationModalProps) {
  const item = props?.item;
  const title = props?.title;
  const description = props?.description;
  const handleConfirm = props?.handleConfirm;
  const handleCancel = props?.handleCancel;

  const danger = props?.danger ?? false;

  const [loading, setLoading] = useState(false);

  async function onClickConfirm() {
    setLoading(true);
    if (handleConfirm) {
      await handleConfirm(item);
    }
    setLoading(false);
  }

  return (
    <Modal
      closable={false}
      {...props}
      footer={[
        <Button loading={loading} danger={danger} onClick={onClickConfirm}>
          Confirm
        </Button>,
        <Button disabled={loading} onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
      title={title}
    >
      <p>{description}</p>
    </Modal>
  );
}
