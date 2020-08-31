import Joi from '@hapi/joi';

const idSchema = Joi.object({
  id: Joi.string().trim().min(24).required(),
});

export default idSchema;