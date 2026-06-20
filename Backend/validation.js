const Joi = require('joi');

// Helper rule to validate standard 24-character Hex MongoDB ObjectIds
const objectIdRule = Joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
  'string.pattern.base': 'Invalid MongoDB ObjectId format.'
});

// Validate User Registration Data
const validateUser = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(10).required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    StudentID: Joi.string().required(),
    role: Joi.string().valid('Admin', 'Student').default('Student')
  });
  return schema.validate(data);
};

// Validate Book Creation Data
const validateBook = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(), // Your custom text ID string
    title: Joi.string().min(1).max(200).required(),
    Image: Joi.string().uri().required().messages({
      'string.uri': 'Image must be a valid URL string.'
    }),
    author: Joi.string().min(2).max(50).required(),
    Description: Joi.string().min(10).required(),
    isAvailable: Joi.boolean().default(true)
  });
  return schema.validate(data);
};

// Validate Borrow API Payload
const validateBorrow = (data) => {
  const schema = Joi.object({
    userId: objectIdRule.required(), // Target's MongoDB unique identifier
    bookId: objectIdRule.required()  // Target's MongoDB unique identifier
  });
  return schema.validate(data);
};

module.exports = { validateUser, validateBook, validateBorrow };
