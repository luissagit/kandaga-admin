import { useModuleContext } from '@/context/base-module.context';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import type {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import { PiPlusBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  breadcrumbItems?: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[];
}

export function IndexPageWrapper(props: Props) {
  const children = props?.children;
  const breadcrumbItems = props?.breadcrumbItems ?? [];

  const navigate = useNavigate();
  const module = useModuleContext();
  const config = module.config;
  const webUrl = config.webUrl;
  const subModuleTitle = config.subModuleTitle;

  function onClickCreate() {
    navigate(`${webUrl}/create`);
  }

  return (
    <div>
      <div className="flex justify-between items-center">
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
          <Button type="primary" onClick={onClickCreate} icon={<PiPlusBold />}>
            Create
          </Button>
        </div>
      </div>
      <div className="py-5">{children}</div>
    </div>
  );
}
