const jwt = require("jsonwebtoken");
const users = require("../Models/userModel");



exports.register = async (req, res) => {

  console.log("inside register request!!!");
  // console.log(req.body);
  const { username, email, password } = req.body
  console.log(username, email, password);
  //  res.status(200).json("Request Received")
  try {
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      res.status(406).json("User Already exists!!!")
    } else {
      const newUser = new users({
        username, email, password, github: "", linkedin: "", profile: ""
      })
      await newUser.save()
      res.status(200).json(newUser)
    }

  } catch (err) {
    res.status(401).json(err)
  }
}



exports.login = async (req, res) => {

  console.log("inside login request!!!");
  // console.log(req.body);
  const { email, password } = req.body
  console.log(email, password);
  //  res.status(200).json("Request Received")
  try {
    const existingUser = await users.findOne({ email, password })
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET)
      res.status(200).json({
        existingUser,
        token
      })
    } else {
      res.status(404).json("incorrect email/password")
    }
  } catch (err) {
    res.status(401).json(err)
  }
}

// updateprofile
exports.editUser = async (req, res) => {
const userId = req.payload
const{username,email,password,github,linkedin,profileImage}= req.body
const profile = req.file?req.file.filename:profileImage
try{
  const updateUser = await users.findByIdAndUpdate({_id:userId},{
    username,email,password,github,linkedin,profile
  })
  await updateUser.save()
  res.status(200).json(updateUser)
}catch(err){
  res.status(401).json(err)
}
}
