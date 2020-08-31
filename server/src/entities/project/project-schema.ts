import Joi from '@hapi/joi';

const image = Joi.object({
    src: Joi.string().trim().min(1).required()
})

const projectSchema = Joi.object({
    name: Joi.string().lowercase().trim().min(1).max(30).required(),
    description: Joi.string().lowercase().trim().min(1).max(30).required(),
    images: Joi.array().items(image).min(3),
    createdOn: Joi.number().required(),
    modifiedOn: Joi.number().required()
})

export default projectSchema;