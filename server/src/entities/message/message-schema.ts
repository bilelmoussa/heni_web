import Joi from '@hapi/joi';

const messageSchema = Joi.object({
  name: Joi.string().trim().min(1).max(30).lowercase().required(),
  email: Joi.string().trim().email().required(),
  message: Joi.string().trim().min(30).required(),
  seen: Joi.boolean().required(),
  createdOn: Joi.number().required(),
});

export default messageSchema;