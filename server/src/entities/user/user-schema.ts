import Joi from '@hapi/joi';

const userSchema = Joi.object({
  fullName: Joi.object({
    firstName: Joi.string().lowercase().trim().min(3).max(30).required(),
    lastName: Joi.string().lowercase().trim().min(1).max(30).required(),
  }),
  email: Joi.string().trim().email().required(),
  role: Joi.number().allow(0, 1).only().required(),
  password: Joi.string().alphanum().min(8).max(30).required(),
  repeatPassword: Joi.ref('password'),
  createdOn: Joi.date().iso().required(),
  modifiedOn: Joi.date().iso().required(),
});

export default userSchema;
