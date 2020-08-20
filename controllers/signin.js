const handleSignin = (req, res, db, bcrypt) => {
    const { password, email } = req.body
    if(!password || !email) {
        return  res.status(400).json('wrong credentials')
    }
    db.select('email', 'hash').from('login').where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            return db.select('*').from('users').where('email', '=', email)
            .then(user => { res.json(user[0])})
            .catch(()=> res.status(400).json('unable to get users'))
        } else {
            res.status(400).json('wrong credentials')
        }
    })
    .catch(() => res.status(400).json('wrong credentials'))
};

module.exports = { handleSignin };