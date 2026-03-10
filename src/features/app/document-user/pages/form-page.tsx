import { notificationFailed } from '@/components';
import { Button, List, Popconfirm, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { documentCategoryService } from '../../document-category/service';
import { useModuleContext } from '../context';
import { useAuthStore } from '@/stores';
import dayjs from 'dayjs';
import { PiTrashBold } from 'react-icons/pi';

export default function FormPage() {
  const module = useModuleContext();
  const { documentCategoryId } = useParams();
  const navigate = useNavigate();
  const auth = useAuthStore();
  const user = auth.auth;

  const webUrl = module.config?.webUrl;
  const service = module.config.service;
  const documentCategorySvc = documentCategoryService;

  const [documentCategory, setDocumentCategory] = useState<any>(null);
  const [loadingDocumentCategory, setLoadingDocumentCategory] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  async function getData(params?: any) {
    try {
      setLoading(true);
      const { data, paging } = await service.getIndex({
        page: params?.current ?? pagination?.current,
        size: params?.pageSize ?? pagination?.pageSize,
        document_category_ids: [documentCategoryId],
        creator_ids: [user?.id],
      });
      if (data) {
        setData(data as any);
      }
      if (paging) {
        setPagination({
          current: paging.current_page,
          pageSize: paging.size,
          total: paging?.size * paging?.total_page,
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveDocument(item: any) {
    try {
      const response = await service.delete(item?.id);
      if (response) {
        getData();
      }
    } catch (error: any) {
      notificationFailed({
        message: error?.message,
      });
    }
  }

  async function getDetailDocumentCategory() {
    if (!documentCategoryId) return;
    try {
      setLoadingDocumentCategory(true);
      const { data } = await documentCategorySvc.getDetail(documentCategoryId);
      setDocumentCategory(data);
      getData();
    } catch (error: any) {
      notificationFailed({
        message: error?.message,
      });
    } finally {
      setLoadingDocumentCategory(false);
    }
  }

  function onClickUpload() {
    navigate(`${webUrl}/create/${documentCategoryId}/upload`);
  }

  function onClickDetail(item: any) {
    navigate(`${webUrl}/create/${documentCategoryId}/detail/${item?.id}`);
  }

  function onClickBack() {
    navigate(`${webUrl}`);
  }

  useEffect(() => {
    getDetailDocumentCategory();
  }, [documentCategoryId]);

  return (
    <Spin
      spinning={loadingDocumentCategory}
      classNames={{ container: 'h-full relative' }}
      className="h-full relative"
    >
      <div className="flex gap-2 flex-wrap justify-between">
        <h2 className="font-bold text-lg">{documentCategory?.name ?? ''}</h2>
      </div>
      <List
        loading={loading}
        dataSource={data}
        pagination={{
          showSizeChanger: true,
          current: pagination?.current,
          pageSize: pagination?.pageSize,
          total: pagination?.total,
          onChange(page, pageSize) {
            const params = {
              current: page,
              pageSize: pageSize,
            };
            setPagination(params as any);
            getData(params);
          },
        }}
        size="large"
        renderItem={(item: any) => {
          return (
            <List.Item
              onClick={(event) => {
                event.stopPropagation();
                onClickDetail(item);
              }}
              extra={
                <div>
                  <Popconfirm
                    title="Apakah anda yakin akan menghapus dokumen ini?"
                    onConfirm={(event) => {
                      event?.stopPropagation();
                      handleRemoveDocument(item);
                    }}
                    onCancel={(event) => {
                      event?.stopPropagation();
                    }}
                  >
                    <Button
                      onClick={(event) => event.stopPropagation()}
                      danger
                      icon={<PiTrashBold />}
                    />
                  </Popconfirm>
                </div>
              }
            >
              <List.Item.Meta
                avatar={
                  <img
                    src={item?.document_category?.icon_url}
                    className="w-[48px]"
                  />
                }
                title={<p className="font-semibold">{item?.name}</p>}
                description={dayjs(item?.created_at)
                  .locale('id')
                  .format('DD MMMM YYYY, HH:mm')}
              />
            </List.Item>
          );
        }}
      />
      <div className="flex gap-2 absolute bottom-0">
        <Button onClick={onClickUpload} type="primary">
          Upload Item
        </Button>
        <Button onClick={onClickBack}>Kembali</Button>
      </div>
    </Spin>
  );
}
