import type { SelectProps } from '../entities';
import { BaseStyleSelect } from '../style/style';
import {
  DropdownIndicator,
  IndicatorSeparator,
  ClearIndicator,
  MultiValueRemove,
} from '../components/indicator';
import { onChangeSelect, transformValue } from '../helpers';
import CreatableReactSelect from 'react-select/creatable';
import '../style/react-select.less';

export function CreatableSelect(props: SelectProps) {
  const {
    value,
    customLabel,
    defaultValue,
    keyLabel = 'code',
    isClearable = true,
    placeholder = 'Choose',
    styles,
    classNamePrefix = 'react-select-custom-prefix',
  } = props;

  return (
    <CreatableReactSelect
      {...props}
      styles={{ ...BaseStyleSelect, ...(styles ? { styles } : {}) }}
      isClearable={isClearable}
      placeholder={placeholder}
      classNamePrefix={classNamePrefix}
      value={transformValue(value, customLabel, keyLabel)}
      onChange={(value: any, meta: any) => onChangeSelect(value, props, meta)}
      defaultValue={transformValue(defaultValue, customLabel, keyLabel)}
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        IndicatorSeparator,
      }}
    />
  );
}
