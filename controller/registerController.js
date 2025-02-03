const path = require("path");
const mail = require('../middlewares/mailer')
const { format } = require("date-fns");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const createTempUni = require('../models/TemporaryUniversity')

// const data = {
//   universities: require("../models/data.json"),
//   setUniversities: function (data) {
//     this.universities = data;
//   },
// };

const getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
};

const createUniversity = async (req, res) => {
  try {
    /* let str = req.body.nameOfInstitute.toUpperCase().split(" ");
    let unicode = "";
    for (let i = 0; i < str.length; i++) {
      unicode += str[i][0];
    }
    if (data.universities[data.universities.length - 1].id + 1 < 10) {
      unicode +=
        "00" + (data.universities[data.universities.length - 1].id + 1);
    }
    const newUniverity = await {
      id: data.universities[data.universities.length - 1].id + 1 || 1,
      uniCode: unicode,
      Name: req.body.nameOfInstitute,
      Address: {
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
      },
      plan: req.body.plan,
      email: req.body.email,
      phone: req.body.mobileNumber,
      subscriptionStartDate: `${format(new Date(), "yyyyMMdd")}`,
    };
    await data.setUniversities([...data.universities, newUniverity]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "data.json"),
      JSON.stringify(data.universities)
    ); */
    await createTempUni(req.body);
    // let succeed = await mail(req.body.email)
    let succeed = true;
    console.log(succeed);
    res.json({'message' : 'please check your email'})
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = {
  getRegisterPage,
  createUniversity,
};
