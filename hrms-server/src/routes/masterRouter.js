const express = require('express')
const router = express.Router()

const masterDao = require('../dao/masterDao');

router.get('/fetch', async (req, res) => {
    const records = await masterDao.fetchMaster(req.query.masterType);
    res.send(
        {
            statusCode:'OK',
            results:records
        }
    );
});

router.post('/save', async (req, res) => {
    const records = await masterDao.saveMaster(req.body.id , req.body.masterType , req.body.valuesJson );
    res.send(
        {
            statusCode:'OK',
            results:records
        }
    );
});

module.exports = router;