import { Layout } from 'antd';

interface Props {
  children: React.ReactNode;
}

export function AuthLayout(props: Props) {
  const children = props.children;
  return (
    <Layout className="w-screen h-screen flex items-center justify-center">
      {children}
    </Layout>
  );
}
