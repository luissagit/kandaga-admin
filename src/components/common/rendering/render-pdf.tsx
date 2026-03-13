import { useModuleContext } from '@/context/base-module.context';
import type { BaseService } from '@/services/base.service';
import { Button, Modal, Spin, type ModalProps } from 'antd';
import { useState } from 'react';
import { PiArrowSquareOutBold, PiDownloadSimpleBold } from 'react-icons/pi';
import { useParams } from 'react-router-dom';

export interface RenderPdfViewer {
  value?: string;
  label?: string;
  modalProps?: ModalProps;
}

export function RenderPdf(props: RenderPdfViewer) {
  const params = useParams();
  const id = params?.id;

  const value = id ?? props?.value;
  const label = props?.label ?? 'Buka Dokumen';
  const modalProps = props?.modalProps;

  const module = useModuleContext();
  const config = module?.config;
  const service = config?.service as BaseService<any>;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | undefined>(undefined);

  async function fetchDocument() {
    if (!value) return;

    setLoading(true);
    try {
      const blob = await service.getFile(value);
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(pdfBlob);
      setDocumentUrl(objectUrl);

      return objectUrl;
    } catch (error) {
      console.error('Gagal load documenr:', error);
    } finally {
      setLoading(false);
    }
  }

  function onOpenDocument() {
    setShowModal(true);
    fetchDocument();
  }

  function closeDocument() {
    setShowModal(false);
  }

  function handleDownload() {
    if (documentUrl) {
      const link = document.createElement('a');
      link.href = documentUrl;
      link.download = `dokumen-${value}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <div>
      <Button onClick={onOpenDocument} icon={<PiArrowSquareOutBold />}>
        {label}
      </Button>

      <Modal
        open={showModal}
        closable={false}
        okButtonProps={{ className: '!hidden' }}
        cancelText="Tutup"
        onCancel={closeDocument}
        destroyOnHidden
        {...modalProps}
        title={
          <div className="flex justify-between items-center pb-4">
            <span>Pratinjau Dokumen</span>
            {documentUrl && (
              <Button
                type="primary"
                icon={<PiDownloadSimpleBold />}
                onClick={handleDownload}
              >
                Unduh Dokumen
              </Button>
            )}
          </div>
        }
      >
        <Spin spinning={loading}>
          <div style={{ height: 'calc(100dvh - 300px)' }}>
            {documentUrl ? (
              <iframe
                src={documentUrl}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            ) : (
              !loading && (
                <div className="text-center p-4">
                  Dokumen tidak ditemukan atau gagal dimuat.
                </div>
              )
            )}
          </div>
        </Spin>
      </Modal>
    </div>
  );
}
