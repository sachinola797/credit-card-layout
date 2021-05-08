import AmexFront from '../assets/images/amex_front.jpeg';
import AmexBack from '../assets/images/amex_back.jpeg';
import AmexLogo from '../assets/images/amex.png';

import VisaFront from '../assets/images/visa_front.jpeg';
import VisaBack from '../assets/images/visa_back.jpeg';
import VisaLogo from '../assets/images/visa.png';

import JcbFront from '../assets/images/jcb_front.jpeg';
import JcbBack from '../assets/images/jcb_back.jpeg';
import JcbLogo from '../assets/images/jcb.png';

import TroyFront from '../assets/images/troy_front.jpeg';
import TroyBack from '../assets/images/troy_back.jpeg';
import TroyLogo from '../assets/images/troy.png';

import DiscoverFront from '../assets/images/discover_front.jpeg';
import DiscoverBack from '../assets/images/discover_back.jpeg';
import DiscoverLogo from '../assets/images/discover.png';

import DinersFront from '../assets/images/dc_front.jpeg';
import DinersBack from '../assets/images/dc_back.jpeg';
import DinersLogo from '../assets/images/dinersclub.png';

import MasterFront from '../assets/images/master_front.jpeg';
import MasterBack from '../assets/images/master_back.jpeg';
import MasterLogo from '../assets/images/mastercard.png';

import UnipayFront from '../assets/images/unionpay_front.jpeg';
import UnipayBack from '../assets/images/unionpay_back.jpeg';
import UnipayLogo from '../assets/images/unionpay.png';

export const DEFAULT_CVC_LENGTH = 3
export const DEFAULT_ZIP_LENGTH = 5
export const DEFAULT_CARD_FORMAT = /(\d{1,4})/g
export const CARD_TYPES = {
  amex: {
    name: 'Amex',
    logo: AmexLogo,
    front: AmexFront,
    back: AmexBack,
    color: 'green'
  },
  visa: {
    name: 'Visa',
    logo: VisaLogo,
    front: VisaFront,
    back: VisaBack,
    color: 'lime'
  },
  diners: {
    name: 'Diners',
    logo: DinersLogo,
    front: DinersFront,
    back: DinersBack,
    color: 'orange'
  },
  discover: {
    name: 'Discover',
    logo: DiscoverLogo,
    front: DiscoverFront,
    back: DiscoverBack,
    color: 'purple'
  },
  jcb: {
    name: 'Jcb',
    logo: JcbLogo,
    front: JcbFront,
    back: JcbBack,
    color: 'red'
  },
  jcb15: {
    name: 'Jcb',
    logo: JcbLogo,
    front: JcbFront,
    back: JcbBack,
    color: 'red'
  },
  maestro: {
    name: 'Maestro',
    logo: MasterLogo,
    front: MasterFront,
    back: MasterBack,
    color: 'yellow'
  },
  mastercard: {
    name: 'Mastercard',
    logo: MasterLogo,
    front: MasterFront,
    back: MasterBack,
    color: 'lightblue'
  },
  unionpay: {
    name: 'Unipay',
    logo: UnipayLogo,
    front: UnipayFront,
    back: UnipayBack,
    color: 'cyan'
  },
  // rupay: {
  //   name: 'Rupay',
  //   color: 'white'
  // },
  troy: {
    name: 'Troy',
    logo: TroyLogo,
    front: TroyFront,
    back: TroyBack,
    color: 'black'
  },
  "": {
    name: '',
    // logo: DiscoverLogo,
    front: DiscoverFront,
    back: DiscoverBack,
    color: 'purple'
  },
}

export const getCardType = (cardNum) => {
    var payCardType = "";
    var regexMap = [
      {regEx: /^4/ig,cardType: "visa"},
      {regEx: /^5[1-5]/ig,cardType: "mastercard"},
      {regEx: /^3/ig,cardType: "diners"},
      {regEx: /^3[47]/ig,cardType: "amex"},
      {regEx: /^(5[06-8]\d{1}|6\d{2})/ig,cardType: "maestro"},
      {regEx: /^7/ig,cardType: "jcb"},

    ];
    
    for (var j = 0; j < regexMap.length; j++) {
      if (cardNum.match(regexMap[j].regEx)) {
        payCardType = regexMap[j].cardType;
        break;
      }
    }

    if (cardNum.indexOf("50") === 0 || cardNum.indexOf("60") === 0 || cardNum.indexOf("65") === 0) {
      var g = "508500-508999|606985-607984|608001-608500|652150-653149";
      var i = g.split("|");
      for (var d = 0; d < i.length; d++) {
        var c = parseInt(i[d].split("-")[0], 10);
        var f = parseInt(i[d].split("-")[1], 10);
        if ((cardNum.substr(0, 6) >= c && cardNum.substr(0, 6) <= f) && cardNum.length >= 6) {
         payCardType = "troy"; // orinal "rupay"
          break;
        }
      }
    }
    return payCardType;
}

export const MONTHS = [
  {label: 'Month', value: '', disabled:true},
  {label: 'Jan', value: '01'},
  {label: 'Feb', value: '02'},
  {label: 'Mar', value: '03'},
  {label: 'Apr', value: '04'},
  {label: 'May', value: '05'},
  {label: 'Jun', value: '06'},
  {label: 'Jul', value: '07'},
  {label: 'Aug', value: '08'},
  {label: 'Sep', value: '09'},
  {label: 'Oct', value: '10'},
  {label: 'Nov', value: '11'},
  {label: 'Dec', value: '12'},
];

export const DEFAULT_YEARS = [
  {label: 'Year', value: '', disabled:true},
  {label: '2021', value: '21'},
  {label: '2022', value: '22'},
  {label: '2023', value: '23'},
  {label: '2024', value: '24'},
  {label: '2025', value: '25'},
  {label: '2026', value: '26'},
  {label: '2027', value: '27'},
];

