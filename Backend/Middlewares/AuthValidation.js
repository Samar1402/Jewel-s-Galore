const Joi = require('joi');
// const { schema } = require('../Models/user'); // Assuming this line is not needed

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
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
        // --- FIX: Correctly chain .status(400).json(obj) to resolve RangeError ---
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