import joi from "joi";
import joiDate from '@joi/date';

const Joi = joi.extend(joiDate);

const customerSchema = joi.object({
  name: joi.string().min(3).required(),
  phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/, "numbers").required(),
  cpf: joi.string().length(11).pattern(/^[0-9]+$/, "numbers").required(),
  birthday: Joi.date().format('YYYY-MM-DD')
});

export default customerSchema;