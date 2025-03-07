const Joi = require('joi');

// Schema for adding a new school
const addSchoolSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    address: Joi.string().min(5).max(255).required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
});

// Schema for listing schools (validating query params)
const listSchoolSchema = Joi.object({
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
});

// Middleware to validate request body
const validateAddSchool = (req, res, next) => {
    const { error } = addSchoolSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

// Middleware to validate request query params
const validateListSchools = (req, res, next) => {
    const { error } = listSchoolSchema.validate(req.query);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

module.exports = { validateAddSchool, validateListSchools };
