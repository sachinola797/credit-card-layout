import React, { Component } from 'react';
import _ from "lodash";
import PropTypes from "prop-types";
import "./Select.scss";

class Select extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    options: PropTypes.array,
    onChange: PropTypes.func,
    label: PropTypes.string,
  };

  static defaultProps = {
    value: "",
  };

  render() {
    const {
      name, value, onChange, options, label,
    } = this.props;

    return (
      <div className="select-container">
        {label}
        <select name={name} className="custom-select" value={value} onChange={onChange}>
          {
            options.map(item => <option disabled={item.disabled} key={item.value} value={item.value}>{item.label}</option>)
          }
        </select>
      </div>
    );
  }
}

export default Select;
