const { User } = require("../models/user");
const fs = require("fs");

exports.photoUpload = ( req, res ) => {
  const { userId } = req.params;
  // Assigned the path to a new constant @photo
  const photo = req.file.path;
  let newUser = new User( { 
      "user.photo.data": fs.readFileSync( req.file.path ),
      "user.photo.contentType": "image/*",
    } )
   
}

exports.create = (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name) return res.status(400).json({ error: "Your name is required" });
  if (!email) return res.status(400).json({ error: "Your email is required" });
  if (!phone) return res.status(400).json({error: "Your phone number is required" });
  if (!address) return res.status(400).json({ error: "Your address is requird" });

  User.findOne({ phone })
    .then(user => {
      if (user) return res.status(400).json({ error: `User with phone number ${req.body.phone} already exists`});
      let newUser = new User({
        name
      })
    })
}