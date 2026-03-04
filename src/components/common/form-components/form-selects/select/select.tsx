import type { SelectProps } from '../entities';
import { BaseStyleSelect } from '../style/style';
import ReactSelect from 'react-select';
import {
  DropdownIndicator,
  IndicatorSeparator,
  ClearIndicator,
  MultiValueRemove,
  Option,
} from '../components/indicator';
import { onChangeSelect, transformValue } from '../helpers';
import '../style/react-select.less';

export function Select(props: SelectProps) {
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
    <ReactSelect
      {...props}
      styles={{ ...BaseStyleSelect, ...(styles ? { styles } : {}) }}
      isClearable={isClearable}
      placeholder={placeholder}
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
