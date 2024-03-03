const {
  addMessages,
  getMessages,
} = require("../controllers/messageControllers");
const router = require("express").Router();

router.post("/getmsg/", getMessages);
router.post("/addmsg/", addMessages);

module.exports = router;
