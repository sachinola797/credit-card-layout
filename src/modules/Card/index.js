import './Card.scss'
import {CARD_TYPES} from '../../utils/cardTypes';
import Chip from '../../assets/images/chip.png'
import CardNumberAnimator from './CardNumberAnimator';

const Card = ({data, flipped}) => {
  return (
    <div className={`flip-card ${flipped ? 'isFlipped': ''}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front" style={{backgroundImage: `url("${CARD_TYPES[data?.cardName]?.front}")`}}>
          <div className="color-overlay" />
          <div className="header">
            <img src={Chip} alt="Chip" height="30px" />
            <img src={CARD_TYPES[data?.cardName]?.logo} />
          </div>
          <div className="card-number"><CardNumberAnimator text={data?.cardNo}/></div>
          <div className="footer">
            <div>
              <div className="label">Card Holder</div>
              <div className="details word-break-all">
                {(data?.cardHolder || "Your Name").split("").map((char, index) => {
                  return <span key={`${index}_${char}`} className="animate-card-holder">{char}</span>
                })}
                </div>
            </div>
            <div>
              <div className="label">Expires</div>
              <div className="details">
                <span className="animate-expiry" key={`month_${data?.expiryMonth}`}>{data?.expiryMonth || 'MM'}</span>/ 
                <span className="animate-expiry" key={`year_${data?.expiryYear}`}>{data?.expiryYear || 'YY'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flip-card-back" style={{backgroundImage: `url("${CARD_TYPES[data?.cardName]?.back}")`}}>
          <div className="color-overlay" />
          <div className="swipe-strip" />
          <div style={{ paddingRight: "8px" }}>CVV</div>
          <div className="sign-strip">{data?.cvv.split("").map((char, index) => <span key={index} className="animate-card-holder">*</span>)}</div>
          <img src={CARD_TYPES[data?.cardName]?.logo} />
        </div>
      </div>
    </div>
  );
};

export default Card;
