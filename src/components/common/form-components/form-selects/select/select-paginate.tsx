import { AsyncPaginate } from 'react-select-async-paginate';
import type { SelectPaginateProps } from '../entities';
import { defaultAdditional, AllOptionItem } from '../helpers';
import {
  DropdownIndicator,
  IndicatorSeparator,
  ClearIndicator,
  MultiValueRemove,
  Option,
} from '../components/indicator';
import { BaseStyleSelect } from '../style/style';
import { onChangeSelect, transformValue, filterOptions } from '../helpers';
import '../style/react-select.less';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

export function SelectPaginate(props: SelectPaginateProps) {
  const {
    key,
    value,
    isMulti,
    customKey,
    customLabel,
    defaultValue,
    dataSourceUrl,
    defaultOptions,
    keySearch = 'q',
    transformOptions,
    keyLabel = 'code',
    customLoadOptions,
    // baseDataSourceUrl,
    filterRequest = {},
    useOptionAllScheme,
    isClearable = true,
    debounceTimeout = 300,
    placeholder = 'Choose',
    styles,
    itemAllOption = AllOptionItem,
    additional = defaultAdditional,
    classNamePrefix = 'react-select-custom-prefix',
    // customHeaderRequest,
    limitValue = 10,
    limitKey = 'limit',
  } = props;

  function makeFilterRequest(page: number, limit: number, search: string): any {
    return {
      page,
      [`${limitKey}`]: limit,
      [keySearch]: search,
      ...filterRequest,
      isRequestOptions: true,
    };
  }

  function makeOptions(options: any) {
    const newOptions = options ?? [];
    return newOptions.map((item: any) => {
      const keys = Object.keys(item ?? {});
      if (keys.length === 2 && keys.includes('label') && keys.includes('value'))
        return item;
      else
        return {
          label: customLabel ? customLabel(item) : item[keyLabel],
          value: item,
        };
    });
  }

  function makeTransformOptions(
    options: any[],
    search?: string,
    values?: any,
  ): any {
    if (transformOptions) return transformOptions(options, search, values);
    return options;
  }

  async function loadDataSource(
    search: any,
    _prevOptions: any,
    { page, limit }: any,
  ) {
    let options: any = [];
    let hasMore = false;
    let newAdditional = additional;
    const { data } = await axios.get(dataSourceUrl as string, {
      params: makeFilterRequest(page, limit, search),
    });

    const meta = data?.paging;
    const rawOptions = makeOptions(makeTransformOptions(data?.data, search));
    options = filterOptions(
      rawOptions,
      transformValue(value ?? defaultValue, customLabel, keyLabel),
    );
    hasMore = meta.currentPage < meta.totalPages && options.length > 0;

    newAdditional = {
      page: meta.current_page + 1,
      limit: limitValue,
    };

    // await dataSource.handleGetMany({
    //   config: {
    //     params: makeFilterRequest(page, limit, search),
    //     headers: customHeaderRequest,
    //   },
    //   onSuccess: ({ data }: any) => {
    //     const response = data?.message?.items ?? data?.data ?? data?.message;
    //     const meta = data?.message?.meta ?? data?.meta;
    //     const rawOptions = makeOptions(makeTransformOptions(response, search));
    //     options = filterOptions(rawOptions, transformValue(value ?? defaultValue, customLabel, keyLabel));
    //     hasMore = meta.currentPage < meta.totalPages && options.length > 0;
    //     newAdditional = {
    //       page: meta.currentPage + 1,
    //       limit: limitValue,
    //     };
    //   },
    //   onFailed: ({ message }) => {
    //     console.log({ message });
    //   },
    // });
    return {
      hasMore,
      options,
      additional: newAdditional,
    };
  }

  async function loadOptions(
    search: any,
    prevOptions: any,
    { page, limit }: any,
  ) {
    if (customLoadOptions)
      return customLoadOptions(search, prevOptions, { page, limit });
    else {
      const realOptions = await loadDataSource(search, prevOptions, {
        page,
        limit,
      });
      if (!useOptionAllScheme) return realOptions;
      else {
        if (isMulti) {
          const hasAllData =
            value?.find((item: any) => item.code?.toUpperCase() === 'ALL') ??
            undefined;
          if (hasAllData) {
            return {
              hasMore: false,
              options: [],
              additional,
            };
          } else if (value?.length > 0) {
            return realOptions;
          }
        }
        return {
          ...realOptions,
          options: [itemAllOption, ...realOptions.options],
        };
      }
    }
  }

  function makeKey() {
    if (customKey) return btoa(customKey(value));
    // else if (!key) return key;
    else if (!key)
      return btoa(
        unescape(encodeURIComponent(JSON.stringify(value ?? uuid()))),
      );
    return btoa(key);
  }

  return (
    <AsyncPaginate
      {...props}
      menuPortalTarget={props?.menuPortalTarget ?? document.body}
      styles={{ ...BaseStyleSelect, ...(styles ? { ...styles } : {}) }}
      key={makeKey()}
      additional={{ ...additional, limit: limitValue }}
      isClearable={isClearable}
      placeholder={placeholder}
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      debounceTimeout={debounceTimeout}
      classNamePrefix={classNamePrefix}
      value={transformValue(value, customLabel, keyLabel)}
      onChange={(value: any) => onChangeSelect(value, props)}
      defaultValue={transformValue(defaultValue, customLabel, keyLabel)}
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        IndicatorSeparator,
        Option,
      }}
    />
  );
}
