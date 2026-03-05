import { useAuthStore, usePaginationStore } from '@/stores';
import { useFilterStore } from '@/stores/filter-store';
import type { Pagination } from '@/types';
import { Form, type FormInstance } from 'antd';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

// --- INTERFACES ---

interface ProviderConfig<S> {
  service: S;
  webUrl: string;
  module: string;
  subModule: string;
  subModuleTitle: string;
}

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

  accessRight: any;

  config: ProviderConfig<S>;
}

// --- GLOBAL BRIDGE ---
// Jembatan agar komponen generic bisa akses context tanpa tahu modul spesifiknya
const ModuleContextShared = createContext<
  BaseContextType<any, any> | undefined
>(undefined);

/**
 * Hook ini digunakan untuk komponen generic (seperti IndexPageWrapper / FormWrapper)
 * agar tidak perlu import dari folder fitur (company/user/dll)
 */
export const useModuleContext = <T, S>() => {
  const context = useContext(ModuleContextShared);
  if (!context) {
    throw new Error(
      'useModuleContext harus digunakan di dalam Provider modul masing-masing.',
    );
  }
  return context as BaseContextType<T, S>;
};

// --- FACTORY FUNCTION ---

export function createModuleContext<T, S>() {
  // Context internal untuk modul spesifik (untuk menjaga Type Safety)
  const Context = createContext<BaseContextType<T, S> | undefined>(undefined);

  const Provider = ({
    children,
    config,
  }: {
    children: ReactNode;
    config: ProviderConfig<S>;
  }) => {
    const authStore = useAuthStore();
    const auth = authStore.auth;
    const accessRights = auth?.access_rights;

    const module = config.module;
    const moduleKey = config.subModule;

    const { moduleFilter, setModuleFilter } = useFilterStore();
    const { modulePagination, setModulePagination } = usePaginationStore();

    const [dataIndex, setDataIndex] = useState<T[]>([]);
    const [selectedDataIndex, setSelectedDataIndex] = useState<T[]>([]);
    const [dataDetail, setDataDetail] = useState<T>({} as T);
    const [accessRight, setAccessRight] = useState<T>({} as T);

    const [pagination, setPaginationState] = useState<Pagination>(
      modulePagination[moduleKey] || {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    );
    const [filterDataIndex, setFilterDataIndexState] = useState<any>(
      moduleFilter[moduleKey] || null,
    );

    const [form] = Form.useForm();
    const [formDetail] = Form.useForm();

    const setPagination = (newPagination: Pagination) => {
      setPaginationState(newPagination);
      setModulePagination(moduleKey, newPagination);
    };

    const setFilterDataIndex = (filter: any) => {
      setFilterDataIndexState(filter);
      setModuleFilter(moduleKey, filter);
    };

    const generateAccessRight = useCallback(
      (accessRights: any[]) => {
        const found = accessRights?.find(
          (item: any) => item?.module === module,
        );

        const timeoutId = setTimeout(() => {
          setAccessRight(found || {});
        }, 0);

        return () => clearTimeout(timeoutId);
      },
      [module],
    );

    useEffect(() => {
      if (accessRights) {
        generateAccessRight(accessRights);
      }
    }, [accessRights, generateAccessRight]);

    const value: BaseContextType<T, S> = {
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
      accessRight,
    };

    return (
      <Context.Provider value={value}>
        {/* Kita bungkus lagi dengan Shared Provider untuk akses global */}
        <ModuleContextShared.Provider value={value}>
          {children}
        </ModuleContextShared.Provider>
      </Context.Provider>
    );
  };

  /**
   * Hook ini digunakan khusus di dalam folder fitur/modul terkait
   * agar mendapatkan auto-complete (Type Safety) yang akurat.
   */
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
