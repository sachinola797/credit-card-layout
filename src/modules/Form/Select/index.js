import React, { Component } from 'react';
import Select, { Creatable } from "react-select";
import _ from "lodash";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import CommonFormPropTypes, { CommonFormDefaultProps } from "common/Form/FormUtils";
import "./Select.scss";
import ErrorToolTip from "common/Form/ErrorTooltip";

class CustomSelect extends Component {
  static propTypes = {
    ...CommonFormPropTypes,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    options: PropTypes.array,
    additionalClass: PropTypes.string,
    maxHeight: PropTypes.string,
    isSearchable: PropTypes.bool,
    isClearable: PropTypes.bool,
    isRefresh: PropTypes.bool,
    refreshFunc: PropTypes.func,
    menuUp: PropTypes.bool,
    isCreatable: PropTypes.bool,
    isMulti: PropTypes.bool,
    ignoreMultiCSS: PropTypes.bool,
    containerClass: PropTypes.string,
    selectHeight: PropTypes.number,
    variant: PropTypes.oneOf(["primary", "secondary"]),
    compCustomStyle: PropTypes.object,
    indicatorSeparatorStyle: PropTypes.object,
    valueContainerStyle: PropTypes.object,
    optionsStyle: PropTypes.object,
    classNamePrefix: PropTypes.string,
    filterOption: PropTypes.func,
    helperText: PropTypes.string,
    showLoading: PropTypes.bool,
  };

  static defaultProps = {
    ...CommonFormDefaultProps,
    options: [],
    additionalClass: "",
    maxHeight: "250px !important",
    isSearchable: true,
    isClearable: true,
    isRefresh: false,
    menuUp: false,
    refreshFunc: () => {},
    isCreatable: false,
    isMulti: false,
    ignoreMultiCSS: false,
    containerClass: "",
    selectHeight: 32,
    compCustomStyle: {},
    variant: "secondary",
    indicatorSeparatorStyle: {},
    valueContainerStyle: {},
    optionsStyle: {},
    classNamePrefix: "react-select",
    filterOption: undefined,
    helperText: "",
    showLoading: false,
  };

  state = {
    options: [],
    loading: false,
    // eslint-disable-next-line react/destructuring-assignment
    values: this.props.value || [], // TODO: fix this
  };

  reload = () => {
    const { refreshFunc, disabled } = this.props;
    if (!disabled) {
      this.setState(prevState => ({ ...prevState, loading: true }));
      refreshFunc && refreshFunc(() => {
        this.setState(prevState => ({ ...prevState, loading: false }));
      }, () => {
      });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { children, options } = nextProps;
    let newOptions = [];
    if (children) {
      if (children.length === 1) {
        newOptions.push({ value: children.props.value, label: children.props.children });
      }
      if (children.length > 1) {
        children.forEach((c) => {
          newOptions.push({ value: c.props.value, label: c.props.children });
        });
      }
    } else {
      newOptions = [...options];
    }
    if (!_.isEqual(newOptions, prevState.options)) {
      return { ...prevState, options: newOptions };
    }
    return null;
  }

  changeSelect = (d) => {
    const { onChange, name, options } = this.props;
    let selectedIndex = null;
    if (d) {
      options.forEach((option, i) => {
        if (option.value === d.value) {
          selectedIndex = i;
        }
      });
    }
    const value = _.get(d, "value", "");
    const event = {
      target: {
        name: name,
        value: typeof value === 'string' ? value.trim() : value,
        selectedIndex: selectedIndex,
      },
    };
    onChange && onChange(event);
  };

  changeSelectMulti = (d) => {
    const { onChange } = this.props;
    const { name, value } = d;
    const event = {
      target: {
        name,
        // value: value && value.map(e => e.value),
        value: value || [],
      },
    };
    onChange && onChange(event);
  };

  render() {
    const {
      value, placeholder, isRefresh, variant, helperText,
      additionalClass, disabled, hasError, showErrorTooltip, // eslint-disable-line
      isSearchable, isClearable, width, isRequired, errorMessage, menuUp, maxHeight, isCreatable,
      isMulti, name, containerClass, selectHeight, compCustomStyle, indicatorSeparatorStyle,
      valueContainerStyle, optionsStyle, classNamePrefix, filterOption, ignoreMultiCSS,
      showLoading, menuTarget,
    } = this.props;
    const {
      options, loading,
    } = this.state;

    const secondaryControlStyle = {
      border: 'none',
      borderBottom: '1px solid hsl(0,0%,80%)',
      background: 'white',
      borderRadius: 0,
    };

    const secondaryIndicatorSeparatorStyle = {
      display: "none",
    };

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        backgroundColor: "#F5F5F5",
        borderColor: (state.isFocused || state.isSelected) // eslint-disable-line
          ? '#E1E1E1' : (hasError)
            ? 'red !important' : provided.borderColor,
        '&:hover': {
          borderColor: (state.isFocused || state.isSelected) ? '#02b6c4' : provided.borderColor,
        },
        '&:focus': {
          borderColor: (state.isFocused || state.isSelected) ? '#02b6c4' : provided.borderColor,
          backgroundColor: "white",
        },
        color: "#63636F",
        caretColor: "#63636F",
        boxShadow: '',
        borderRadius: '30px',
        width: (isMulti && !ignoreMultiCSS) ? '300px' : width,
        fontSize: "12px",
        minHeight: selectHeight,
        ...((isMulti && !ignoreMultiCSS) ? { padding: "2px 4px" } : { height: selectHeight }),
        cursor: (state.isDisabled) ? "not-allowed" : "default",
        ...(variant === "primary" ? {} : secondaryControlStyle),
        ...compCustomStyle,
      }),
      placeholder: provided => ({
        ...provided,
        paddingLeft: '8px',
        color: "#BEBEBE",
        fontStyle: "italic",
        fontSize: "12px",
      }),
      menu: provided => ({
        ...provided,
        zIndex: 15,
        maxHeight,
        marginTop: '0px !important',
        top: (menuUp) ? 'auto' : '100%',
        bottom: (menuUp) ? '100%' : 'auto',
        marginBottom: (menuUp) ? '0px' : '70px',
      }),
      menuList: provided => ({
        ...provided,
        zIndex: 15,
        maxHeight,
        fontSize: "12px",
      }),
      singleValue: provided => ({
        ...provided,
        paddingLeft: '8px',
        color: "#63636F",
        caretColor: "#63636F",
      }),
      multiValue: styles => ({
        ...styles,
        borderRadius: "15px",
        padding: "2px 2px",
      }),
      multiValueLabel: styles => ({
        ...styles,
        color: "#63636F",
      }),
      multiValueRemove: styles => ({
        ...styles,
        color: "#63636F",
        ':hover': {
          backgroundColor: "#63636F",
          color: 'white',
        },
      }),
      input: provided => ({
        ...provided,
        paddingLeft: '9px',
        color: "#63636F",
        caretColor: "#63636F",
      }),
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      option: (provided, state) => ({
        ...provided,
        // eslint-disable-next-line
        color: (state.isDisabled) ? "#a7a7ac" : ((state.isSelected || state.isFocused) ? 'white' : '#02b6c4'),
        padding: '7px 20px',
        backgroundColor: (!state.isDisabled && (state.isSelected || state.isFocused)) ? "#02b6c4" : "white",
        wordBreak: 'break-all',
        cursor: state.isDisabled ? 'not-allowed' : 'default',
        ...optionsStyle,
      }),
      container: provided => ({
        ...provided,
        width: (width === "100%") ? "100%" : "inherit",
        pointerEvents: "All",
      }),
      indicatorsContainer: provider => ({
        ...provider,
        marginTop: "-3px",
        height: selectHeight + 2,
        margin: 'auto',
      }),
      indicatorSeparator: provider => ({
        ...provider,
        ...(variant === "primary"
          ? {} : secondaryIndicatorSeparatorStyle),
        ...indicatorSeparatorStyle,
      }),
      valueContainer: provider => ({
        ...provider,
        ...valueContainerStyle,
      }),
    };

    let valueTitle;
    if (value) {
      if (!isMulti) {
        options.forEach((option) => {
          if (option.value === value) {
            valueTitle = option.toolTip ? option.toolTip : option.label;
          }
        });
      } else {
        const labelArray = [];
        value.forEach(v => labelArray.push(v.label));
        valueTitle = labelArray.join(", ");
      }
    }
    return (
      <div
        className={`${containerClass} custom-select-container custom-select-hover-color`}
        title={disabled ? (helperText || valueTitle || undefined)
          : ((hasError && !showErrorTooltip && errorMessage) || valueTitle || undefined)}
      >
        {(isRequired) && (
        <span
          className={`blue-dot ${(disabled || loading || showLoading) ? "disabled-select" : ""}`}
        />
        )}
        {
          (isCreatable)
            ? (
              <Creatable
                options={options.filter(option => option.label && option.label !== "")}
                value={options.filter(obj => (obj.value === value))}
                placeholder={(placeholder) || "Select"}
                isClearable={isClearable}
                isSearchable={isSearchable}
                styles={customStyles}
                onChange={this.changeSelect}
                isDisabled={disabled || loading || showLoading}
                formatCreateLabel={str => str}
              />
            )
            : (
              <Select
                options={options.filter(option => option.label && option.label !== "")}
                value={isMulti ? value : options.filter(obj => (obj.value === value))}
                isMulti={isMulti}
                placeholder={(placeholder) || "Select"}
                isClearable={isClearable}
                isSearchable={isSearchable}
                styles={customStyles}
                // menuIsOpen
                onChange={isMulti
                  ? (valuesSelected) => {
                    this.changeSelectMulti({ name, value: valuesSelected });
                  }
                  : this.changeSelect}
                isDisabled={disabled || loading || showLoading}
                closeMenuOnSelect={!isMulti}
                classNamePrefix={classNamePrefix}
                filterOption={filterOption}
                menuPortalTarget={menuTarget}
              />
            )}
        {
          (isRefresh || showLoading) && (
            <span
              className="loader-custom"
              hidden={!loading && !showLoading}
            />
          )
        }
        {(isRefresh && !showLoading) && (
        <FontAwesome
          name="refresh"
          style={{
            fontSize: "20px",
            cursor: disabled ? "not-allowed" : "pointer",
            color: "#02b6c4",
            marginLeft: "10px",
          }}
          className={`refresh-icon ${(loading) ? "hidden" : ""}`}
          onClick={this.reload}
        />
        )}
        {(hasError && showErrorTooltip) && (<ErrorToolTip errorMessage={errorMessage} />)}
      </div>
    );
  }
}

export default CustomSelect;
