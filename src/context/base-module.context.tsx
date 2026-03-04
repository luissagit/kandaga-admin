import type { Pagination } from '@/types';
import { Form, type FormInstance } from 'antd';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface BaseContextType<T, S> {
  dataIndex: T[];
  setDataIndex: (data: T[]) => void;

  selectedDataIndex: T[];
  setSelectedDataIndex: (data: T[]) => void;

  filterDataIndex: any;
  setFilterDataIndex: (data: any) => void;

  pagination: Pagination;
  setPagination: (data: Pagination) => void;

  dataDetail: T;
  setDataDetail: (data: T) => void;

  form: FormInstance<any>;
  formDetail: FormInstance<any>;

  config: ProviderConfig<S>;
}

interface ProviderConfig<S> {
  service: S;
  webUrl: string;
  subModule: string;
  subModuleTitle: string;
}

export function createModuleContext<T, S>() {
  const Context = createContext<BaseContextType<T, S> | undefined>(undefined);

  const Provider = ({
    children,
    config,
  }: {
    children: ReactNode;
    config: ProviderConfig<S>;
  }) => {
    const [dataIndex, setDataIndex] = useState<T[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
      current: 1,
      pageSize: 10,
      total: 0,
    });
    const [filterDataIndex, setFilterDataIndex] = useState<any>(null);
    const [selectedDataIndex, setSelectedDataIndex] = useState<T[]>([]);

    const [dataDetail, setDataDetail] = useState<T>({} as T);

    const [form] = Form.useForm();
    const [formDetail] = Form.useForm();

    return (
      <Context.Provider
        value={{
          dataIndex,
          setDataIndex,
          selectedDataIndex,
          setSelectedDataIndex,
          filterDataIndex,
          setFilterDataIndex,
          pagination,
          setPagination,
          dataDetail,
          setDataDetail,
          form,
          formDetail,
          config,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  const useModule = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(
        'Hook ini harus digunakan di dalam Provider-nya masing-masing.',
      );
    }
    return context;
  };

  return [Provider, useModule] as const;
}
