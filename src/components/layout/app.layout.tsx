import { Button, Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  PiFileArchiveBold,
  PiFileArrowUpBold,
  PiFileMagnifyingGlassBold,
  PiGearBold,
  PiUserCircleDashedBold,
  PiUserGearBold,
  PiUserListBold,
} from 'react-icons/pi';
import type { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { WEB_URL } from '@/constants/web-url';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';

interface Props {
  children: React.ReactNode;
}

function flattenMenuItems(items: any[]): any[] {
  return _.flatMap(items, (item: any) =>
    item.children ? [item, ...flattenMenuItems(item.children)] : [item],
  );
}

export function AppLayout(props: Props) {
  const children = props.children;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const menuItems: ItemType<MenuItemType>[] = [
    {
      key: '',
      icon: <PiFileArrowUpBold />,
      label: 'Transaction',
    },
    {
      key: '2',
      icon: <PiFileArchiveBold />,
      label: 'Master Data',
      children: [
        {
          key: '2.1',
          icon: <PiFileMagnifyingGlassBold />,
          label: 'Document Category',
        },
      ],
    },
    {
      key: '3',
      icon: <PiUserCircleDashedBold />,
      label: 'User Management',
      children: [
        {
          key: '3.1',
          icon: <PiUserGearBold />,
          label: 'User',
        },
        {
          key: '3.2',
          icon: <PiUserListBold />,
          label: 'User Category',
        },
      ],
    },
    {
      key: WEB_URL.COMPANY,
      icon: <PiGearBold />,
      label: 'Configuration',
    },
  ];

  const allFlatMenus = flattenMenuItems(menuItems);
  const selectedMenu = _.chain(allFlatMenus)
    .filter((item) => item.key && pathname.startsWith(item.key))
    .orderBy([(item) => item.key.length], ['desc'])
    .first()
    .value();
  const selectedKey = selectedMenu?.key || '';
  const openKey = _.find(menuItems, (item: any) =>
    _.some(
      item.children,
      (child) => child.key && pathname.startsWith(child.key),
    ),
  )?.key;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="w-screen h-screen overflow-hidden">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={240}
      >
        <div className="p-3">
          <h1 className="font-bold bg-primary-200 p-3 rounded text-primary-700">
            {collapsed ? 'LG' : 'KANDAGA'}
          </h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={openKey ? [openKey as string] : []}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer, padding: 0 }}>
          <div className="flex gap-2 items-center h-full">
            <Button
              className="sm:ml-3 lg:ml-5"
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
              }}
            />
            <h2 className="font-semibold text-base">
              {selectedMenu?.label ?? ''}
            </h2>
          </div>
        </Header>
        <Content className="sm:p-3 lg:p-5">
          <div className="bg-white rounded-md h-full sm:p-3 lg:p-5">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
