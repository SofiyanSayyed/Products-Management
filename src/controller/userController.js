const userModel = require('../models/userModel')

const {trimObjectProperties, isValidString, isValidName, isValidEmail, isValidUrl
    , isValidPhone, isValidPassword, isValidAddress} = require('../validations/validation');

const bcrypt = require('bcrypt');




//...............Create a new user................................................................
const createUser = async (req, res) => {
    let data = req.body
    trimObjectProperties(data)
    let {fname , lname , email , profileImage , phone , password , address} = data


    if(!fname || !lname || !email /*|| !profileImage*/ || !phone || !password || !address){
        return res.status(400).json({status: false, message: "Enter all required fields"})
    }

    if(!isValidName(fname)){
        return res.status(400).json({status: false, message: "Enter valid fname"});
    }
    if(!isValidName(lname)){
        return res.status(400).json({status: false, message: "Enter valid lname"});
    }
    if(!isValidEmail(email)){
        return res.status(400).json({status: false, message: "Enter valid email"});
    }
    // if(!isValidUrl(profileImage)){
    //     return res.status(400).json({status: false, message: "Enter valid profileImage"});
    // }

    if(!isValidPhone(phone)){
        return res.status(400).json({status: false, message: "Enter valid phone"});
    }
    //check if already exists
    let isPhone = await userModel.findOne({ phone: phone});
    if(isPhone !== null) return res.status(400).json({status:false, message: "Phone Alreday Exists"})


    if(!isValidPassword(password)){
        return res.status(400).json({status: false, message: "Enter valid password length between 8 to 15"});
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    if(!isValidAddress(address)){
        return res.status(400).json({status: false, message: "Enter Valid address"});
    }

    data.password = hashedPassword  



    let user = await userModel.create(data)

    return res.status(201).json({status: true, data: user})

}


module.exports = {createUser}