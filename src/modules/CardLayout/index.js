import React, {Component} from "react";
import './cardLayout.scss'
import Card from "../Card";
import Input from  "../Form/Input";
import {DEFAULT_YEARS, MONTHS, getCardType} from "../../utils/cardTypes";
import Select from "../Form/Select";

const defaultFormFields = {
  cardName: "",
  cardNo: "",
  cardHolder: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
};

class CardLayout extends Component {
  state = {
    flipped: false,
    formFields: {...defaultFormFields},
  };

  resetForm = () => {
    const {formFields} = this.state;
    if (window.confirm(`Submit this form.\n${JSON.stringify(formFields, null, 2)}`)) {
      this.setState((prevState) => ({
        ...prevState,
        formFields: {...defaultFormFields},
      }))
    }
  }

  changeField = (event) => {
    const {name, value} = event.target;
    this.setState(prevState => ({
      ...prevState,
      formFields: {
        ...prevState.formFields,
        [name]: value,
      },
    }));
  }

  flipCard = (value) => {
    this.setState(prevState => ({
      ...prevState,
      flipped: value,
    }))
  }

  normalizeCardNumber = (value) => {
    return value.replace(/\s/g, "").match(/[0-9]{1,4}/g)?.join(" ").substr(0,19) || "";
  }


  render() {
    const {flipped, formFields, formFields:{cardName, cardNo, cardHolder, expiryMonth, expiryYear, cvv}} = this.state;
    return (
      <div className='container'>
        <Card data={formFields} flipped={flipped} />
        <div className='form-container'>
          <Input
            name="cardNo"
            inputType="tel"
            value={cardNo}
            label="Card Number"
            onChange={(e) => {
              const {cardNo} = this.state.formFields;
              const {value} = e.target;
              e.target.value = this.normalizeCardNumber(value);
              if (e.target.value !== cardNo) {
                this.changeField(e);
                this.setState((prevState) => ({
                  ...prevState,
                  formFields: {...prevState.formFields, cardName: getCardType(value)}
                }))
              }
            }}
          />
          <Input
            name="cardHolder"
            inputType="text"
            value={cardHolder}
            label="Card Holder"
            maxLength="40"
            onChange={(e) => this.changeField(e)}
          />
          <div className="custom-grid">
            <Select
              name="expiryMonth"
              label="Expiration Date"
              value={expiryMonth}
              onChange={(e) => this.changeField(e)}
              options={MONTHS}
            />
            <Select
              name="expiryYear"
              value={expiryYear}
              onChange={(e) => this.changeField(e)}
              options={DEFAULT_YEARS}
            />
            <Input
              name="cvv"
              inputType="text"
              value={cvv}
              label="CVV"
              onChange={(e) => {
                const {cvv} = this.state.formFields;
                const {value} = e.target;
                e.target.value = value.match(/\d{1,3}/g)?.join("").substr(0,3) || "";
                if (e.target.value !== cvv) {
                  this.changeField(e);
                }
              }}
              onFocus={()=> this.flipCard(true)}
              onBlur={()=> this.flipCard(false)}
            />
          </div>
          <Input
            name="submit"
            inputType="button"
            value="Submit"
            onClick={this.resetForm}
          />
        </div>

      </div>
    );
  }
}

export default CardLayout;
