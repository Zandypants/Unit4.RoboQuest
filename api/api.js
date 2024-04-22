const prisma = require("../db/connection");
const router = require("express").Router();
const {safeAsync} = require("../helpers.js");

router.get("/robots", (req, res, next) => {
  safeAsync(async () => {
    res.send(await prisma.robot.findMany());
  }, next);
});

router.get("/robots/:id", (req, res, next) => {
  safeAsync(async () => {
    res.send(await prisma.robot.findUnique({ where: { id: +req.params.id } }));
  }, next);
});

module.exports = router;