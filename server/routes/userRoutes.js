const {
  register,
  login,
  setAvatar,
  allUserRoutes,
} = require("../controllers/usersController");
const router = require("express").Router();
router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id", setAvatar);
router.get("/alluser/:id", allUserRoutes);
module.exports = router;
