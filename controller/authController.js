const jsonwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });

const axios = require("axios");

module.exports.isLoggedIn = (role)=>{
  return async (req, res, next) => {
  let token = "";
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token === "") {
    return next();
  }

  const decoded = jsonwt.verify(token, process.env.MY_SECRET_KEY);
  try {
    const result = await axios({
      url: `http://localhost:3000/api/${role}/${decoded.emailId}`,
      method: "GET",
    });
    if (result.status === 200) {
      res.locals.donor = result.data;
      return next();
    }
  } catch (error) {
    return next();
  }
}
};

module.exports.protectRoute = (role) => {
  return async (req, res, next) => {
    let token = "";
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (token === "") {
      return res.status(401).send("You are not logged in. No token");
    }
    const decoded = jsonwt.verify(token, process.env.MY_SECRET_KEY);
    // console.log(decoded.emailId);
    try {
      const result = await axios({
        url: `http://localhost:3000/api/${role}/${decoded.emailId}`,
        method: "GET",
      });
      console.log(result.data.role, role);
      if (result.status === 200) {
        if (result.data.role === role.toLowerCase()) {
          console.log("Route accessed");
          return next();
        } else {
          return new Error("You are not authorized");
        }
      }
    } catch (error) {
      //   console.log(error.message);
      res.status(401).send("You are not logged in. Please login first");
    }
  };
};

module.exports.getLoggedOut = (role) => {
  return (req, res, next) => {
    res.cookie("jwt", "logout", {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).redirect(`/${role}`);
  };
};
