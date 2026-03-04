import { BASE_API_URL } from '@/constants';
import { typeOf } from 'mathjs';

export const defaultAdditional = {
  page: 1,
  limit: 10,
};

export const AllOptionItem = {
  label: 'ALL',
  value: {
    id: '5724590b-0912-40ff-aaf2-3bbc0186215f',
    uuid: '5724590b-0912-40ff-aaf2-3bbc0186215f',
    code: 'ALL',
    name: 'ALL',
    status: 'active',
  },
};

export function makeUrlOptions(url: string, baseUrl?: string): string {
  return `${baseUrl ?? BASE_API_URL}${url}`;
}

export function isObject(value: any) {
  const exType = ['string', 'number', 'boolean'];
  const typeValue = typeOf(value);
  return !exType.includes(typeValue);
}

export function makeArrayValue(
  value: any[],
  customLabel: any,
  keyLabel: string,
): any[] {
  if (!value || value?.length === 0) return value;
  return value.map((itemValue) => {
    const isObj = isObject(itemValue);
    if (!isObj) {
      return {
        label: customLabel ? customLabel(itemValue) : itemValue,
        value: itemValue,
      };
    }
    return {
      label: customLabel ? customLabel(itemValue) : itemValue[keyLabel],
      value: itemValue,
    };
  });
}

export function makeValue(value: any, customLabel: any, keyLabel: string): any {
  if (!value) return value;
  const isObj = isObject(value);
  if (!isObj) {
    return {
      label: customLabel ? customLabel(value) : value,
      value: value,
    };
  }
  return {
    label: customLabel ? customLabel(value) : value[keyLabel],
    value: value,
  };
}

export function transformValue(
  value: any,
  customLabel: any,
  keyLabel: string,
): any {
  if (!value) return null;
  else if (Array.isArray(value))
    return makeArrayValue(value, customLabel, keyLabel);
  return makeValue(value, customLabel, keyLabel);
}

function makeOnChangeArrayValue(value: any[]): any[] {
  if (!value || value?.length === 0) return value;
  return value.map((itemValue) => {
    return itemValue?.value;
  });
}

function makeOnChangeValue(value: any): any {
  if (!value) return value;
  return value?.value;
}

export function onChangeSelect(value: any, props: any, meta?: any) {
  if (Array.isArray(value)) {
    const newValue = makeOnChangeArrayValue(value);
    if (props.onChange) props.onChange(newValue, meta);
  } else {
    const newValue = makeOnChangeValue(value);
    if (props.onChange) props.onChange(newValue, meta);
  }
}

export function filterOptions(options: any[], initialValue: any): any[] {
  let newOpt = options;
  if (Array.isArray(initialValue)) {
    newOpt = newOpt
      ?.map((item) => {
        const findLabel = initialValue?.find(
          (itemInit) => itemInit.label === item.label,
        );
        if (findLabel) return null;
        return item;
      })
      .filter(Boolean);
  }
  return newOpt;
}
