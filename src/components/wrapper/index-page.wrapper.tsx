import { useModuleContext } from '@/features/app/company/context';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import type {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';

interface Props {
  children: React.ReactNode;
  breadcrumbItems?: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[];
}

export function IndexPageWrapper(props: Props) {
  const children = props?.children;
  const breadcrumbItems = props?.breadcrumbItems ?? [];

  const module = useModuleContext();
  const config = module.config;
  const subModuleTitle = config.subModuleTitle;

  return (
    <div>
      <Breadcrumb
        items={[
          {
            href: '#',
            title: <HomeOutlined />,
          },
          {
            title: subModuleTitle,
          },
          ...breadcrumbItems,
        ]}
      />
      <div className="py-5">{children}</div>
    </div>
  );
}
