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
  const [isBreakPoint, setIsBreakPoint] = useState(false);

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
          key: WEB_URL.USER,
          icon: <PiUserGearBold />,
          label: 'User',
        },
        {
          key: WEB_URL.USER_CATEGORY,
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
        className="h-full border-r border-primary-100"
        width={240}
        breakpoint="lg"
        collapsedWidth="0"
        style={{ position: isBreakPoint ? 'absolute' : 'static', zIndex: 9 }}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
          setIsBreakPoint(broken);
        }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <div className="p-3">
          <h1 className="font-bold bg-primary-200 p-3 rounded text-primary-700 flex items-center justify-between">
            <span>{collapsed ? 'LG' : 'KANDAGA'}</span>
            {isBreakPoint && (
              <Button
                className="sm:ml-3 lg:ml-5"
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                }}
              />
            )}
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
              className="ml-3 sm:ml-4 lg:ml-5"
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
        <Content className="p-3 sm:p-4 lg:p-5">
          <div className="bg-white rounded-md h-full p-3 sm:p-4 lg:p-5 overflow-auto">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
