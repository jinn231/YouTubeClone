const {SignUp, SignIn, SignInWithGoogle, signOut} = require("../controller/Auth");
const express = require("express")
const router = express.Router();

// User SignUp
router.post("/sign-up", SignUp )

// User SignIn
router.post("/sign-in", SignIn )

// OAuth2
router.post("/google", SignInWithGoogle)

router.post("/sign-out", signOut)

module.exports = router;