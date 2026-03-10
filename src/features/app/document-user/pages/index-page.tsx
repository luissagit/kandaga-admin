import { IndexPageWrapper } from '@/components';
import { Filter } from '../components';
import { useModuleContext } from '../context';
import { useEffect, useState } from 'react';
import { List } from 'antd';
import { documentCategoryService } from '../../document-category/service';
import { useNavigate } from 'react-router-dom';

export default function IndexPage() {
  const navigate = useNavigate();
  const module = useModuleContext();

  const documentCategory = documentCategoryService;

  const webUrl = module.config.webUrl;

  const dataIndex = module.dataIndex;
  const setDataIndex = module.setDataIndex;
  const pagination = module.pagination;
  const setPagination = module.setPagination;

  const [loading, setLoading] = useState(false);

  async function getData(params?: any) {
    try {
      setLoading(true);
      const { data, paging } = await documentCategory.getIndex({
        page: params?.current ?? pagination?.current,
        size: params?.pageSize ?? pagination?.pageSize,
      });
      if (data) {
        setDataIndex(data as any);
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

  function onClickItem(item: any) {
    navigate(`${webUrl}/create/${item?.id}`);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <IndexPageWrapper
      filterProps={{ filterComponent: <Filter /> }}
      showCreate={false}
      showFilter={false}
    >
      <List
        loading={loading}
        dataSource={dataIndex}
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
            setPagination(params);
            getData(params);
          },
        }}
        size="large"
        renderItem={(item: any) => {
          return (
            <List.Item onClick={() => onClickItem(item)}>
              <List.Item.Meta
                avatar={<img src={item?.icon_url} className="w-[48px]" />}
                title={<p className="font-semibold">{item?.name}</p>}
                description={item?.description ?? ''}
              />
            </List.Item>
          );
        }}
      />
    </IndexPageWrapper>
  );
}
