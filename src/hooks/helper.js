// return the english name of a country
const getCountryEnName = (country) => {

  if(country.countryEnglishName === null) {
    switch(country.countryName) {
      case "库拉索岛": return "Curaçao";
      case "瓜德罗普岛": return "Guadeloupe";
      case "美属维尔京群岛": return "U.S. Virgin Islands";
      case "圣巴泰勒米岛": return "St. Barthélemy Island";
      case "吉尔吉斯斯坦": return "Kyrgyzstan";
      case "马约特": return "Mayotte";
      case "黑山": return "Montenegro";
      case "刚果（布）": return "Congo";
      case "格陵兰": return "Greenland";
      case "赞比亚共和国": return "Zambia";
      case "阿鲁巴": return "Aruba";
      case "新喀里多尼亚": return "New Caledonia";
      case "厄立特里亚": return "Eritrea";
      case "东帝汶": return "Timor-Leste";
      default:
        return null;  // don't know the actual english name  
    }
  } 
  
  switch(country.countryEnglishName) {
    case "United States of America": return "United States";
    case "The Islamic Republic of Mauritania": return "Mauritania";
    case "Democratic Republic of the Congo": return "Dem. Rep. Congo";
    case "The Republic of Equatorial Guinea": return "Eq. Guinea";
    case "Central African Republic": return "Central African Rep.";
    case "Czech Republic": return "Czech Rep.";
    case "Republic of Serbia": return "Serbia";
    case "Republic of Rwanda": return "Rwanda";
    case "Dominican Republic": return "Dominican Rep.";
    case "Kingdom of Bhutan": return "Bhutan";
    case "SriLanka": return "Sri Lanka";
    case "Kazakstan": return "Kazakhstan";
    case "Kampuchea (Cambodia )": return "Cambodia";
    case "Saint Vincent and the Grenadines": return "St. Vincent & Grenadines";
    case "Somali": return "Somalia";
    case "St.Lucia": return "Saint Lucia";
    case "Cayman Is": return "Cayman Islands";
    case "Ivory Coast": return "Côte d'Ivoire";
    case "Burma": return "Myanmar";
    case "Papua New Cuinea": return "Papua New Guinea";
    case "EI Salvador": return "El Salvador";
    case "Bosnia and Herzegovina": return "Bosnia and Herz.";
    case "North Macedonia": return "Macedonia";
    case "United Kingdom": 
      if(country.countryName === "英国（含北爱尔兰）") return null;
      return "United Kingdom";
    // case "Grand Princess Cruise": return "Grand Princ"ess Cruise";
    case "Diamond Princess Cruise Ship": return "Diamond Princess";
    default: 
      return country.countryEnglishName;
  }
}

export const convertNameToMap = (name) => {
  switch(name) {
    case "USA": return "United States";
    case "UK": return "United Kingdom";
    case "S. Korea": return "Korea";
    case "Western Sahara": return "W. Sahara";
    case "South Sudan": return "S. Sudan";
    case "Czechia": return "Czech Rep.";
    case "Laos": return "Lao PDR";
    case "Equatorial Guinea": return "Eq. Guinea";
    case "DRC": return "Dem. Rep. Congo";
    case "CAR": return "Central African Rep.";
    case "UAE": return "United Arab Emirates";
    case "Eswatini": return "Swaziland";
    case "Bosnia and Herzegovina": return "Bosnia and Herz.";
    case "St. Vincent Grenadines": return "St. Vincent & Grenadines";
    case "Ivory Coast": return "Côte d'Ivoire";
    case "North Macedonia": return "Macedonia";
    case "Dominican Republic": return "Dominican Rep.";

    // case "Kingdom of Bhutan": return "Bhutan";
    // case "Somali": return "Somalia";
    // case "St.Lucia": return "Saint Lucia";
    // case "Cayman Is": return "Cayman Islands";
    // case "Burma": return "Myanmar";
    // case "Papua New Cuinea": return "Papua New Guinea";

    // case "Grand Princess Cruise": return "Grand Princ"ess Cruise";
    case "Diamond Princess Cruise Ship": return "Diamond Princess";
    default: 
      return name;
  }

}

// export const getClientHeight = () => {  
//   let clientHeight = 0;  
//   if(document.body.clientHeight && document.documentElement.clientHeight){  
//       clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? 
//                       document.body.clientHeight : document.documentElement.clientHeight;
//   }else{  
//       clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? 
//                       document.body.clientHeight : document.documentElement.clientHeight;
//   }  
//   return clientHeight;  
// }

// export const getScrollTop = () => {  
//   let scrollTop=0;  
//   if(document.documentElement && document.documentElement.scrollTop){  
//       scrollTop = document.documentElement.scrollTop;  
//   }else if(document.body){  
//       scrollTop = document.body.scrollTop;  
//   }  
//   return scrollTop;  
// }

// export const getScrollHeight = () => {  
//   return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);  
// }

export default function processCountryNames (countries) {
  return countries.map(country => {
    return {...country, countryEnglishName: getCountryEnName(country)}    
  });
}