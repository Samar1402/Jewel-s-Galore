const jwt = require('jsonwebtoken')
const UserModel = require("../Models/user");
const bcrypt = require('bcrypt')

const login = async(req,res)=>{
    try{
        const { email, password } = req.body;
        // Initial find for password comparison
        let user = await UserModel.findOne({email}); 
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

        // --- CHANGE START: Re-fetch the user to get the latest profileImage and exclude password ---
        user = await UserModel.findById(user._id).select('-password'); 
        // --- CHANGE END ---
        
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
            email: user.email,
            name: user.name,
            _id: user._id,
            // --- CHANGE --- Include the profileImage field from the freshly fetched user
            profileImage: user.profileImage 
        })
    }catch(err){
        res.status(500).json({message: "Internal Server Error", sucess: false})
    }
}

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ 
      message: "Signup Success", 
      success: true, 
      token,
      _id: newUser._id, 
      name: newUser.name, 
      email: newUser.email,
      // --- CHANGE --- Ensure profileImage is included in signup response (defaults to "")
      profileImage: newUser.profileImage
    });
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