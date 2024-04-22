const prisma = require("./db/connection.js");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { safeAsync } = require("./helpers.js");

router.post("/register", (req, res, next) => {
  safeAsync(async () => {
    // hash password

    // add engineer to database
    const engineer = await prisma.engineer.create({ data: req.body });

    // get/send token from engineerId
    const token = jwt.sign({ id: engineer.id }, process.env.JWT);
    res.send({ token });
  }, next);
});

router.post("/login", (req, res, next) => {
  safeAsync(async () => {
    // get username and password from req.body

    // hash password

    // find engineer matching username and hashed password
    const engineer = await prisma.engineer.findUnique({ where: req.body });

    // get/return token from engineerId
    const token = jwt.sign({ id: engineer.id }, process.env.JWT);
    res.send({ token });
  }, next);
});

module.exports = router;