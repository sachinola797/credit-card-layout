import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import "./Input.scss";

class Input extends PureComponent {

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    inputType: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    maxLength: PropTypes.string,

  };

  static defaultProps = {
    inputType: 'text',
    value: "",
  };

  togglePassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const {
      value, name, onChange, inputType, min,
       label, maxLength, onFocus, onBlur, onKeyPress, onClick,
    } = this.props;
    return (
      <div className="input-container">
        {label}
        <input
          name={name}
          value={value}
          onKeyPress={onKeyPress}
          onClick={onClick}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`input-custom`}
          type={inputType}
          min={min}
          maxLength={maxLength}
        />
      </div>
    );
  }
}

export default Input;
