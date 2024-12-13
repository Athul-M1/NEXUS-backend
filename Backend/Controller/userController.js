const bcrypt = require('bcrypt')
const userModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
        const { username, email, password } = req.body
         if (!username || !email || !password){
                res.status(400).send("Please fill the form")
        }
        else {
                try {
                        const existingUser = await userModel.findOne({email})
                        if (existingUser) {
                                res.status(409).send({message:"User already exists"})
                        }
                        else{
                                const saltRounds = 10
                                const hashpassword = await bcrypt.hash(password, saltRounds)
                                const newUser = await new userModel({
                                        username, email, password: hashpassword, age: '', gender: '', profilePicture: ''
                                })
                                newUser.save()
                                res.status(201).send({ message: 'newuser added', newUser })
                        }
                }
                catch (err) {
                        res.status(500).send("Internal server error")
                        console.log(err)
                }
        }
}
//login
exports.login = async(req,res)=>{
        const{email,password} = req.body
        try{
                const existingUser = await userModel.findOne({email})
                if(existingUser){
                        const result = await bcrypt.compare(password,existingUser.password)
                        if(result){
                                //used for token generation
                                const token = jwt.sign({id:existingUser._id},'supersimplekey')
                                res.status(200).send({token,existingUser})
                        }
                        else{
                                res.status(404).send({message:"Incorrect email or password"})
                        }
                }else{
                        res.status(404).send({message:"Account not found"})
                }
        }
        catch(err){
                res.status(500).send("Internal Server Error")
                console.log(err)
        }
}
