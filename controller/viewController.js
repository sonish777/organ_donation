//var request = require('request-promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const alert = require('alert-node');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config({path:'./../config.env'});

module.exports.getHome = (req,res)=>{
    res.status(200).render('home');
}

module.exports.SignUp= async (req,res)=>{
    console.log(req.body);
    const password= req.body.password;
    const salt =  await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    req.body.password = hashed;
    req.body.personId = req.body.emailId;
    delete req.body.confirmpassword;
    req.body.role = "donor";
        try {
            const result = await axios({
                url:'http://192.168.11.11:3000/api/Donor',
                method: 'POST',
                data: req.body, 
                json: true,
                headers:{
                    'Content-Type': 'application/json',
                }
            });
            if(result.status === 200) {
                //alert("Signed up successfully");
                return res.redirect('http://localhost:8000/donor');
            }
        } 
        catch (error) {
            console.log(error);
            if(error.response.data.error.message.includes("the object already exists")) {
                alert("Email already in use");
                return res.redirect('http://localhost:8000/donor/register');
            }
            alert("Something went wrong");
            return res.redirect('http://localhost:8000/donor/register');
        }
    }


module.exports.SignIn = async(req,res,next)=>{
    try {
        const result = await axios({
            url:`http://192.168.11.11:3000/api/Donor/${req.body.emailId}`,
            method:'GET',

        });
            // request.get(http://192.168.11.9:3000/api/Donor/${req.body.emailId}, async (err,response,body)=>{
            // if(err){
            //     return alert("invalid email or password");
            // }
            const data = result.data;
            const validPassword = await bcrypt.compare(req.body.password, data.password);
            console.log(result);
            if(validPassword)
            {
                const token = jwt.sign({ emailId : req.body.emailId }, process.env.MY_SECRET_KEY);
                res.cookie("jwt",token,{
                  expires:new Date(Date.now()+ 24*60*60*1000),
                  httpOnly:true
      
              });
            return next();
            }
            else{
                alert("Invalid email or password");
                return res.redirect('http://localhost:8000/donor');
            }
            
        //});
        }
        catch (error) {
            alert("Invalid email or password");
            return res.redirect('http://localhost:8000/donor');
        }      
}










