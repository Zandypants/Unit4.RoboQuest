const prisma = require("../db/connection");
const router = require("express").Router();
const {safeAsync, unwrapObj, validateToken} = require("../helpers.js");
const { rawListeners } = require("../server.js");

// Read
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

// Auth middleware
router.use(validateToken);

// Write
router.post("/robots", (req, res, next) => {
  safeAsync(async () => {
    req.body.engineerId = req.user?.id;
    res.send(await prisma.robot.create({ data: req.body }));
  }, next);
});

// Update
router.put("/robots/:id", (req, res, next) => {
  safeAsync(async () => {
    delete req.body.engineerId; // restrict data from req.body
    res.send(await prisma.robot.update({
      data: req.body, 
      where: { id: +req.params.id, engineerId: req.user?.id }
    }));
  }, next);
});

// Delete
router.delete("/robots/:id", (req, res, next) => {
  safeAsync(async () => {
    res.send(await prisma.robot.delete({ 
      where: { id: +req.params.id, engineerId: req.user?.id }
    }));
  }, next);
});

module.exports = router;