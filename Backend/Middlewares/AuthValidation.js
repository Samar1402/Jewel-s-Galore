const Joi = require('joi');

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
    securityKey: Joi.string()
      .length(4)
      .pattern(/^[0-9]+$/) 
      .required()
      .messages({
        'string.length': 'Security Pin must be exactly 4 digits.',
        'string.pattern.base': 'Security Pin must contain only numbers.',
        'any.required': 'Security Pin is required.'
      }),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Bad request", details: error.details });

  next();
};

const loginValidation = (req,res,next)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    })

    const {error} = schema.validate(req.body)
    if (error){
        return res.status(400).json({
            message: "Bad request", 
            details: error.details
        });
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}