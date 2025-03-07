require('dotenv').config();
const express = require('express');
const UserRoute = require('./routes/schoolRoutes');

const app = express();
app.use(express.json());

app.use('/', UserRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
