import { makeLoginVerification } from '../validation';

type LoginArgs = {
    email: string,
    password: string,
};

const loginVerify = (getUserByEmail: Function) => {
  return async ({email, password}: LoginArgs) => {
    const result = await makeLoginVerification({email: email, password: password, getUserByEmail: getUserByEmail});
    return result 
  };
};

export default loginVerify;