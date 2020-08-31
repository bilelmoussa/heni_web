import loginVerification from './login-verification';
import validateSchema from '../../shared/validator';
import LoginSchema from './login-schema';
import {verify as verifyPassword} from 'argon2';

const checkUserLogininfo = validateSchema(LoginSchema);

const makeLoginVerification = loginVerification({checkUserLogininfo, verifyPassword});

export { makeLoginVerification };