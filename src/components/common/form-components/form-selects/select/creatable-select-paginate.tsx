import type { SelectPaginateProps } from '../entities';
import { defaultAdditional, AllOptionItem } from '../helpers';
import {
  DropdownIndicator,
  IndicatorSeparator,
  ClearIndicator,
  MultiValueRemove,
} from '../components/indicator';
import { BaseStyleSelect } from '../style/style';
import { onChangeSelect, transformValue, filterOptions } from '../helpers';
import '../style/react-select.less';

import Creatable from 'react-select/creatable';
import type { CreatableProps } from 'react-select/creatable';
import { withAsyncPaginate } from 'react-select-async-paginate';
import type {
  UseAsyncPaginateParams,
  ComponentProps,
} from 'react-select-async-paginate';
import type { GroupBase } from 'react-select';
import type { ReactElement } from 'react';
import axios from 'axios';

type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean,
> = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

type AsyncPaginateCreatableType = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false,
>(
  props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>,
) => ReactElement;

const CreatableAsyncPaginate = withAsyncPaginate(
  Creatable,
) as AsyncPaginateCreatableType;

export function CreatableSelectPaginate(props: SelectPaginateProps) {
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
    customLabelOnField,
  } = props;

  function makeFilterRequest(page: number, limit: number, search: string): any {
    return {
      page,
      limit,
      [keySearch]: search,
      ...filterRequest,
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

  function makeTransformOptions(options: any[], search: string): any {
    if (transformOptions) return transformOptions(options, search);
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
    const { data } = await axios.get(dataSourceUrl as string);
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
    //       limit: 10,
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
      return btoa(unescape(encodeURIComponent(JSON.stringify(value ?? {}))));
    return btoa(key);
  }

  return (
    <CreatableAsyncPaginate
      {...props}
      styles={{ ...BaseStyleSelect, ...(styles ? styles : {}) }}
      key={makeKey()}
      additional={additional}
      isClearable={isClearable}
      placeholder={placeholder}
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      debounceTimeout={debounceTimeout}
      classNamePrefix={classNamePrefix}
      value={transformValue(value, customLabelOnField ?? customLabel, keyLabel)}
      onChange={(value: any, meta: any) => onChangeSelect(value, props, meta)}
      defaultValue={transformValue(
        defaultValue,
        customLabelOnField ?? customLabel,
        keyLabel,
      )}
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        IndicatorSeparator,
        ...(props?.components ?? {}),
      }}
    />
  );
}
