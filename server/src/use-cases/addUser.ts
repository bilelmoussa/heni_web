import {makeUser, UserType} from '../entities';

type makeAddUserArgsType = {
    User: any,
    addNewUser: Function;
}

const makeAddUser = ({User, addNewUser}: makeAddUserArgsType) => {
    const addUser = async (userInfo: UserType) => {
        const newUser = await makeUser(userInfo);

        //  HASH PASSWORD
        const paswHash = await newUser.makePswHash();

        const userDb = new User({
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
            password: paswHash,
            createdOn: newUser.createdOn,
            modifiedOn: newUser.modifiedOn
        });

        const result = await addNewUser(userDb);

        return result;
    }

    return addUser;
}

export default makeAddUser;