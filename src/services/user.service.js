const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */

const getUserById = async (userId)=>{
    const check = await User.findById({_id: userId});
    return check;
}

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserByEmail(email)
/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */

const getUserByEmail = async(userEmail)=>{
    const check = await User.findOne({email: userEmail});
    return check;
}

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement createUser(user)
/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */

const createUser = async(user) =>{
    const isEmailTaken = await User.isEmailTaken(user.email);
    if(isEmailTaken)
        throw new ApiError(
            httpStatus.OK,
            'Email already taken'
        );
    else
    {
        const result= await User.create(user);
        return result;
    }
}


const getUserAddressById = async (id) => {
    const result = await User.findOne({_id: id}, {email: 1, address: 1});
    return result;
  };


const setAddress = async (user, newAddress) => {
    user.address = newAddress;
    await user.save();
  
    return user.address;
  };



module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    getUserAddressById,
    setAddress
  }

