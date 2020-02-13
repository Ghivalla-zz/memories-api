const handleProfileGet = (req, res, db)=>{
    const {id} = req.params;
    const user = db.select('*').from('users').where({id}).then(user=>{
        if (user.length)
            res.json(user[0]);
        else
            res.status(404).json('error getting the user');
    })
};

module.exports = { handleProfileGet };