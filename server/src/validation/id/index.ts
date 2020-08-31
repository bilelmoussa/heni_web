import idVlidation from './id-verification';
import validateSchema from '../../shared/validator';
import idSchema from './id-schema';

const checkId = validateSchema(idSchema);

const makeIdValidation= idVlidation(checkId);

export { makeIdValidation, checkId }