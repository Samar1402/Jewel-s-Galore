const jwt = require('jsonwebtoken')
const UserModel = require("../Models/user");
const bcrypt = require('bcrypt')

const login = async(req,res)=>{
    try{
        const { email, password } = req.body;
        const user =await UserModel.findOne({email});
        const errMsg = "Auth failed email or password is wrong!" 
        if (!user){
            return res.status(403)
                .json({message: errMsg, sucess: false})
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual){
            return res.status(403)
                .json({message: errMsg, sucess: false})
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
        .json({
            message: "Login Success", 
            sucess: true,
            jwtToken,
            email,
            name: user.name
        })
    }catch(err){
        res.status(500).json({message: "Internal Server Error", sucess: false})
    }
}

// const signup = async(req,res)=>{
//     try{
//         const {name, email, password} = req.body;
//         const user =await UserModel.findOne({email});
//         if (user){
//             return res.status(409)
//                 .json({message: "User is already exist, you can login", sucess: false})
//         }
//         const userModel= new UserModel({name, email, password});
//         userModel.password = await bcrypt.hash(password, 10);
//         await userModel.save();
//         res.status(201)
//         .json({message: "Signup Success", sucess: true})
//     }catch(err){
//         res.status(500).json({message: "Internal Server Error", sucess: false})
//     }
// }

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ message: "Signup Success", success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId).select('-password');

    if (!user) return res.status(404).json({ message: "User not found", success: false });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


module.exports = {
    signup,
    login,
    getUser
}