import Joi from "joi";

const userSchema = Joi.object().keys({
  firstName: Joi.string()
    .pattern(new RegExp("^[a-zA-Z]+"))
    .min(2)
    .max(40)
    .required(),
  lastName: Joi.string()
    .pattern(new RegExp("^[a-zA-Z]+"))
    .min(2)
    .max(40)
    .required(),
  email: Joi.string().email().required(),
});

export default userSchema;
