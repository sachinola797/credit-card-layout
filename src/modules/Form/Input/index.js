import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import "./Input.scss";

class Input extends PureComponent {
  state = {
    showPassword: false,
  };

  static propTypes = {
    inputType: PropTypes.string,
    showPasswordCheckbox: PropTypes.bool,
    inputHeight: PropTypes.number,
    variant: PropTypes.oneOf(["primary", "secondary"]),
  };

  static defaultProps = {
    inputType: 'text',
  };

  togglePassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const {
      value, name, onChange, disabled, className, inputType,
      placeholder, hasError, isRequired, errorMessage, width,
      showPasswordCheckbox, showErrorTooltip, min, inputHeight,
      variant,

      label, pattern, maxLength,
    } = this.props;
    const { showPassword } = this.state;
    return (
      <div className="input-container width-100">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          value={value}
          onChange={onChange}
          className={`input-custom input-${variant} ${className}`}
          type={inputType}
          min={min}
          pattern={pattern}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </div>
    );
  }
}

export default Input;
