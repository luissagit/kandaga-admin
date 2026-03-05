import { useModuleContext } from '@/context/base-module.context';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import type {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import { PiFunnelBold, PiPlusBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { DrawerFilter } from '../common';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
  breadcrumbItems?: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[];
  filterComponent?: React.ReactNode;
}

export function IndexPageWrapper(props: Props) {
  const children = props?.children;
  const filterComponent = props?.filterComponent;
  const breadcrumbItems = props?.breadcrumbItems ?? [];

  const navigate = useNavigate();
  const module = useModuleContext();

  const setFilterDataIndex = module.setFilterDataIndex;

  const config = module.config;
  const webUrl = config.webUrl;
  const subModuleTitle = config.subModuleTitle;

  const [showDrawerFilter, setShowDrawerFilter] = useState(false);

  function onClickCreate() {
    navigate(`${webUrl}/create`);
  }

  function onClickFilter() {
    setShowDrawerFilter(true);
  }

  async function handleSubmitFilter(payload: any) {
    if (setFilterDataIndex) {
      setFilterDataIndex(payload);
    }
    handleCancelFilter();
  }

  function handleCancelFilter() {
    setShowDrawerFilter(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <Breadcrumb
          items={[
            {
              href: '#',
              title: <HomeOutlined />,
            },
            ...breadcrumbItems,
            {
              title: subModuleTitle,
            },
          ]}
        />
        <div className="flex gap-2 items-center">
          <Button onClick={onClickFilter} icon={<PiFunnelBold />}>
            Filter
          </Button>
          <Button type="primary" onClick={onClickCreate} icon={<PiPlusBold />}>
            Create
          </Button>
        </div>
      </div>
      <div className="py-5">{children}</div>
      <DrawerFilter
        open={showDrawerFilter}
        handleConfirm={handleSubmitFilter}
        handleCancel={handleCancelFilter}
      >
        {filterComponent}
      </DrawerFilter>
    </div>
  );
}
