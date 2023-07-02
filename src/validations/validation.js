const validUrl = require('valid-url')
const userModel = require('../models/userModel')

//removing extra spaces from strings
const trimObjectProperties = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      }
      else if (typeof obj[key] === 'object' && obj[key] !== null) {
        trimObjectProperties(obj[key]); // Recursive call for nested objects
      }
    }
  }

  
const isValidString = (value) => {
    if(typeof value !== 'string' || value.trim() === '') return false;
    if(typeof value === 'undefined' || value === null) return false;
    return true
}

const isValidName = (value) => {
    const strRegex = /^[a-zA-Z\s]+$/;
    return strRegex.test(value);
    
}

const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

// const isValidUrl = (value) => {
//     return validUrl.isUri(value);
// }
const isValidPhone = (value) => {
    const phoneRegex = /^[6789]\d{9}$/;
    if(phoneRegex.test(value.trim())){
        return true;
    }
    else return false;
}

const isValidPassword = (value) => {
    if(!isValidString(value)) return false;
    if(value.trim().length < 8 || value.trim().length > 15) return false
    return true;
}


const isValidAddress = (value) => {
    if(Object.keys(value).includes("shipping")) {
        let {street, city, pincode} = value.shipping
        if(!street || !city || !pincode) return false;
        if(!isValidString(street)) return false
        if(!isValidString(city)) return false
        if(typeof pincode !== 'number' ) return false
        if(pincode.toString().length !== 6) return false
    }

    if(Object.keys(value).includes("billing")){
        let {street, city, pincode} = value.billing
        if(!street || !city || !pincode) return false;
        if(!isValidString(street)) return false
        if(!isValidString(city)) return false
        if(typeof pincode !== 'number' ) return false;
        if(pincode.toString().length !== 6) return false;
        return true;
    }

    return false
}


module.exports = {
    trimObjectProperties,
    isValidString,
    isValidName,
    isValidEmail,
    //isValidUrl,
    isValidPhone,
    isValidPassword,
    isValidAddress}