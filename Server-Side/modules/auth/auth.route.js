const { auth } = require("../../middleware/auth");
const { signup, confirmEmail,  signIn, updateUser, getAll, sendCode, ForgetPassword } = require("./controller/controller");

const router = require("express").Router();

router.post("/signup", signup);
router.get("/confirmEmail/:token", confirmEmail);
router.post("/signin", signIn);
router.put('/updateuser',auth(),updateUser)
router.get("/getdata", auth(), getAll);
router.post('/sendcode',sendCode)
router.post('/forgetpassword',ForgetPassword)
module.exports = router;
