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

export interface FilterProps {
  filterComponent?: React.ReactNode;
  transformFilter?(payload: any): any;
}

export interface IndexPageWrapperProps {
  children: React.ReactNode;
  breadcrumbItems?: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[];
  filterProps?: FilterProps;

  showCreate?: boolean;
  showFilter?: boolean;
}

export function IndexPageWrapper(props: IndexPageWrapperProps) {
  const children = props?.children;
  const filterProps = props?.filterProps;
  const breadcrumbItems = props?.breadcrumbItems ?? [];

  const showCreate = props?.showCreate ?? true;
  const showFilter = props?.showFilter ?? true;

  const filterComponent = filterProps?.filterComponent;

  const navigate = useNavigate();
  const module = useModuleContext();
  const accessRight = module.accessRight;

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
          {showFilter && (
            <Button onClick={onClickFilter} icon={<PiFunnelBold />}>
              Filter
            </Button>
          )}
          {accessRight?.create && showCreate && (
            <Button
              type="primary"
              onClick={onClickCreate}
              icon={<PiPlusBold />}
            >
              Create
            </Button>
          )}
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
