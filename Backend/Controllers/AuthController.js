const jwt = require('jsonwebtoken');
const UserModel = require("../Models/user");
const bcrypt = require('bcrypt');

// ---------------------- LOGIN ----------------------
const login = async(req,res)=>{
    try{
        const { email, password } = req.body;
        let user = await UserModel.findOne({email}); 
        const errMsg = "Auth failed email or password is wrong!" 
        if (!user) return res.status(403).json({message: errMsg, sucess: false});
        
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) return res.status(403).json({message: errMsg, sucess: false});

        user = await UserModel.findById(user._id).select('-password'); 
        
        const jwtToken = jwt.sign(
            { 
                email: user.email, 
                _id: user._id,
                role: user.role // 🔑 CHANGE: ADD ROLE TO JWT PAYLOAD
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.status(200).json({
            message: "Login Success", 
            sucess: true,
            jwtToken,
            email: user.email,
            name: user.name,
            _id: user._id,
            profileImage: user.profileImage,
            role: user.role // 🔑 CHANGE: ADD ROLE TO RESPONSE BODY
        })
    }catch(err){
        res.status(500).json({message: "Internal Server Error", sucess: false})
    }
}

// ---------------------- SIGNUP ----------------------
const signup = async (req, res) => {
  try {
    const { name, email, password, securityKey } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ 
        name, 
        email, 
        password: hashedPassword, 
        securityKey,
        role: 'user' // 🔑 CHANGE: SET DEFAULT ROLE
    });
    
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ 
      message: "Signup Success", 
      success: true, 
      token,
      _id: newUser._id, 
      name: newUser.name, 
      email: newUser.email,
      profileImage: newUser.profileImage,
      role: 'user' // 🔑 CHANGE: ADD ROLE TO RESPONSE BODY
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ---------------------- GET USER ----------------------
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

// ---------------------- VERIFY PIN ----------------------
const verifyPin = async (req, res) => {
  try {
    const { email, securityKey } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.securityKey !== securityKey) {
      return res.status(403).json({ message: "Incorrect Security Pin", success: false });
    }

    return res.status(200).json({
      message: "Verification successful",
      success: true
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ---------------------- RESET PASSWORD USING PIN ----------------------
const resetPasswordWithPin = async (req, res) => {
  try {
    const { email, securityKey, newPassword } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.securityKey !== securityKey) {
      return res.status(403).json({ message: "Invalid security pin", success: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
      success: true
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
    signup,
    login,
    getUser,
    verifyPin,
    resetPasswordWithPin
};