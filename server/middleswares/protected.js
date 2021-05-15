const jwt = require('jsonwebtoken')
const secret = require("../keys").JWT_SECRET
const mongoose = require("mongoose")
const User = mongoose.model("User")
module.exports = (req, res, next) =>
{


    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "You need to be logged in" })
    }
    const token = authorization.replace("Bearer ", "")

    jwt.verify(token, secret, (err, payload) =>
    {
        //Checking if the token is valid
        if (err) {

            return res.json({ error: err }).status(401)
        }

        //Getting user details by ID
        const { id } = payload
        User.findById(id)
            .then(userdata =>
            {
                //Storing user data in request's user parameter
                req.user = userdata
                next()
            })

    })


}