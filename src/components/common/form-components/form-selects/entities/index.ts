import { AxiosHeaders } from 'axios';
import type { Props, GroupBase } from 'react-select';
import type {
  AsyncPaginateProps,
  LoadOptions,
} from 'react-select-async-paginate';

export interface BaseSelectProps {
  key?: string;
  keyLabel?: string;
  customLabel?(row: any, payload?: any): string;
}
export interface AdditionalSelectProps {
  page: number;
  limit: number;
}
export interface OptionsType {
  label: string;
  value: any;
}

export interface SelectProps extends Props, BaseSelectProps {
  customOptions?(payload: any): any[];
}
export interface SelectPaginateProps
  extends
    Omit<
      AsyncPaginateProps<any, GroupBase<any>, AdditionalSelectProps, boolean>,
      'loadOptions'
    >,
    BaseSelectProps {
  itemAllOption?: OptionsType;
  keySearch?: string;
  filterRequest?: any;
  dataSourceUrl?: string;
  baseDataSourceUrl?: string;
  useOptionAllScheme?: boolean;
  customKey?(value: any): string;
  transformOptions?(options: any[], search?: string, values?: any): any;
  customFilterRequest?(payload: any): any;
  loadOptions?: LoadOptions<any, GroupBase<any>, AdditionalSelectProps>;
  customLoadOptions?: LoadOptions<any, GroupBase<any>, AdditionalSelectProps>;
  customDataSourceUrl?(payload: any): string;
  customHeaderRequest?: AxiosHeaders | any;
  customLabelOnField?(value: any): string;
  limitValue?: number;
  limitKey?: string;
}
