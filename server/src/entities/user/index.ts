import crypto from 'crypto';
import {User, UserType} from './user';
import userSchema from './user-schema';
import validateSchema from '../../shared/validator';
import {hash} from 'argon2';

const checkValidation = validateSchema(userSchema);

/**
 * hash function
 * @param {string} text hashed text
 * @return {any} hash
 */
function md5(text: string): any {
  return crypto
      .createHash('md5')
      .update(text, 'utf8')
      .digest('hex');
}

const makeUser = async (user: UserType) => new User(
    checkValidation,
    md5,
    hash,
    user,
);

export {makeUser, UserType};
