import Joi from '@hapi/joi';

const getMessagesQuerySchema = Joi.object({
  skip: Joi.number(),
  limit: Joi.number()
});

export default getMessagesQuerySchema;