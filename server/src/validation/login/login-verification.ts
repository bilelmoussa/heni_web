import { BadRequest } from '../../errors';

type MakeLoginArgs = {
    checkUserLogininfo: Function,
    verifyPassword: Function,
}

type LoginArgs = {
    email: string,
    password: string,
    getUserByEmail: Function,
}

const loginVerification = ({checkUserLogininfo, verifyPassword}: MakeLoginArgs) => {
    return async ({email, password, getUserByEmail}: LoginArgs) => {
        const userInfoValidation = checkUserLogininfo({
            email: email,
            password: password
        });

        if (userInfoValidation) {
            throw new BadRequest('Incorrect Password or Email');
        }
        
        const userRecord = await getUserByEmail(email);

        if (!userRecord) {
            throw new BadRequest('Incorrect Password or Email');
        }

        const isMatch = await verifyPassword(userRecord.password, password);

        if(!isMatch) {
            throw new BadRequest('Incorrect Password or Email');
        }

        return userRecord;
    }
}

export default loginVerification;