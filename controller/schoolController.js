const pool = require('../db');

// Add School API
exports.addNewSchool = async (req, res) => {
    try {
        await pool.query('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', 
            [req.body.name, req.body.address, req.body.latitude, req.body.longitude]);
        res.status(201).json({ message: 'School added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List Schools API (sorted by distance)
exports.listSchoolAPI = async (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    try {
        const [schools] = await pool.query('SELECT * FROM schools');
        
        const sortedSchools = schools.map(school => ({
            ...school,
            distance: Math.sqrt(
                Math.pow(school.latitude - latitude, 2) +
                Math.pow(school.longitude - longitude, 2)
            )
        })).sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}