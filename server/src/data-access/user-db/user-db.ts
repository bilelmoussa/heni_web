import {Document, Schema, model, Model} from 'mongoose';
import { BadRequest } from '../../errors'
 
// USER SCHEMA
const userSchema = new Schema({
    fullName: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
    },
    email: {type: String, required: true, unique: [true, 'Email must be unique']},
    role: {type: Number, enum: [0, 1], default: 0, required: true},
    password: {type: String, trim: true, required: true, select: false},
    createdOn: {type: Date, required: true},
    modifiedOn: {type: Date,required: true},
})

//  FULLNAME TYPE
type fullName = {
    firstname: string,
    lastName: string,
}

//  ROLE TYPE
enum UserRoles {
    Standard,
    Admin,
}

type TUserRoles =
    UserRoles.Standard |
    UserRoles.Admin;

//  USER MODEL INTERFACE     
interface Userchema extends Document {
    fullName: fullName,
    email: string,
    role: TUserRoles,
    password: string,
    createdOn: Date,
    modifiedOn: Date,
}

//  USER MODEL
const User: Model<Userchema> = model('User', userSchema);

export { User };


//  ADD USER FUNCTION
export const addNewUser = async (userInfo: Userchema) => {
    try {
        const result = await userInfo.save();
        if(result) {
            return {
                _id: result._id,
                fullName: result.fullName,
                email: result.email,
                role: result.role,
                createdOn: result.createdOn,
                modifiedOn: result.modifiedOn,
            }
        }
        return result;
    } catch (err) {
        throw new BadRequest(err.message);
    }
}

//  GET USERS BY EMAIL
export const getUserByEmail = async (email: string) => {
    const result = await User.findOne({email: email}).select(['_id', 'fullName', 'email', 'password', 'role', 'createdOn', 'modifiedOn']);
    if (result) {
        return {
            id: result._id,
            fullName: result.fullName,
            email: result.email,
            password: result.password,
            role: result.role,
            createdOn: result.createdOn,
            modifiedOn: result.modifiedOn,
        };
    }
    return result;
}

//  GET USERS BY ID
export const getUserById = async (id: string) => {
    const result = await User.findOne({_id: id});
    if (result) {
      return {
        id: result._id,
        fullName: result.fullName,
        email: result.email,
        role: result.role,
        createdOn: result.createdOn,
        modifiedOn: result.modifiedOn,
      };
    }
    return result;
};

// GET ALL USERS
export const getAllUsers = async () => {
    const result = await User.find();
    return result;
};

//  DELETE USER BY ID 
export const deleteUserById = (id: string) => {
    const result = User.deleteOne({_id: id});
    return result;
};


