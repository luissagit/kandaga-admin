import { ConfigProvider } from 'antd';
import { theme } from '@/assets';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import '@/utils/axios.interceptor';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
