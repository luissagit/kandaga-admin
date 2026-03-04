import { components } from 'react-select';
import { DownOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const DropdownIndicator = (props: any) => {
  const style = {
    cursor: 'pointer',
  };
  return (
    <components.DropdownIndicator {...props}>
      <DownOutlined className="fs-12" style={style} />
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = (props: any) => {
  const style = {
    cursor: 'pointer',
  };
  return (
    <components.ClearIndicator {...props}>
      <div id={`${props?.selectProps?.id ?? 'select'}_clear_value`}>
        <CloseCircleOutlined style={style} />
      </div>
    </components.ClearIndicator>
  );
};

export const MultiValueRemove = (props: any) => {
  const style = {
    cursor: 'pointer',
    fontSize: '9px',
  };
  return (
    <components.MultiValueRemove {...props}>
      <div id={`${props?.selectProps?.id ?? 'select'}_remove_value_${props?.data?.label ?? ''}`}>
        <CloseOutlined style={style} />
      </div>
    </components.MultiValueRemove>
  );
};

export const IndicatorSeparator = () => {
  // console.log(props);
  return <span></span>;
};

export const Option = (props: any) => {
  return (
    <div id={`${props?.selectProps?.id ?? 'select'}_option_${props?.label ?? ''}`}>
      <components.Option {...props} />
    </div>
  );
};
