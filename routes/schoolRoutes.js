const express = require('express');
const {addNewSchool, listSchoolAPI} = require("../controller/schoolController");
const { validateAddSchool, validateListSchools } = require('../middleware/validator');
const router = express();

router.post('/addSchool',validateAddSchool, addNewSchool);
router.get('/listSchools',validateListSchools, listSchoolAPI);

module.exports = router;