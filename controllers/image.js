const clarifai =require('clarifai');

const app = new clarifai.App({
    apiKey: process.env.CLAIFAI_API_KEY
});

const handleApiCall = (req,res) => app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch((err) => res.status(400).json(err));

const handleImage = (req, res, db) => {
    const {id} = req.body
    db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries').then(entries => res.json(entries[0]))
    .catch(() => res.status(400).json('enable to get entries'))
    
};

module.exports = { handleImage, handleApiCall };