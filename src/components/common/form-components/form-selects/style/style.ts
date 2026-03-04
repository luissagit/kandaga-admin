export const BaseStyleSelect = {
  base: (base: any) => ({
    ...base,
    // zIndex: 9999,
    height: 31.6,
    minHeight: '205px',
  }),

  menu: (provided: any) => ({
    ...provided,
    zIndex: 99999999,
    // paddingTop: '5px',
    marginTop: '5px',
    borderRadius: '6px !important',
    padding: '4px !important',
  }),

  option: (provided: any, { isFocused }: any) => ({
    ...provided,
    fontWeight: '400',
    fontSize: '14px',
    color: '',
    borderRadius: '6px !important',
    backgroundColor: isFocused ? '#f5d48d' : undefined,
    // zIndex: 999999,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#555',
    top: '55%',
    fontSize: '14px',
    paddingLeft: '10px',
    textWrap: 'wrap',
    overflowWrap: 'anywhere',
    // padding: '0px 14px',
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0 2px',
    paddingLeft: '10px',
    color: '#555',
    // position: 'absolute',
    fontSize: '12px',
    '&input': {
      background: 'magenta',
    },
  }),
  control: (provided: any, state: any) => {
    const style = {
      ...provided,
      width: '100%',
      boxShadow: state.isFocused ? 0 : 0,
      // borderColor: '#d9d9d9',
      borderColor: '#ddd',
      padding: '0',
      minHeight: '31.6px !important',
    };
    // if (state?.isMulti && !state?.isDisabled) Object.assign(style, { borderColor: 'purple' });
    return style;
  },
  placeholder: () => ({
    fontWeight: '400',
    fontSize: '14px',
    color: '#c4c4c4 !important',
    paddingLeft: '10px',
  }),
  noOptionsMessage: (provided: any) => ({
    ...provided,
    fontWeight: '400',
    fontSize: '12px',
    color: '#555',
    overflow: 'visible',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    // padding: '0 6px',
    padding: '0px 0px 0px 6px',
    minHeight: '20px',
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
  }),

  multiValue: (styles: any) => {
    return {
      ...styles,
      backgroundColor: '#ffffff',
      border: 'transparent',
      padding: '0px',
      borderRadius: '999px',
    };
  },
  multiValueLabel: (styles: any) => ({
    ...styles,
    fontSize: '11px !important',
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: 'rgba(0, 0, 0, 0.45)',
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  clearIndicator: (styles: any) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
    color: 'rgba(0, 0, 0, 0.45)',
  }),
  menuPortal: (styles: any) => ({
    ...styles,
    zIndex: 9999,
  }),
};
