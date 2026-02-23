import { celebrate, Joi, Segments } from "celebrate";

export const createBookSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().max(150).required(),
    num_pages: Joi.number().positive().integer().required(),
    isbn: Joi.string().min(10).max(13).required(),
    publisher: Joi.string().max(150).required(),
  }),
});

export const updateBookSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().max(150).required(),
    num_pages: Joi.number().positive().integer().required(),
    isbn: Joi.string().length(13).required(),
    publisher: Joi.string().max(150).required(),
  }),
});

export const idParamsValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});
