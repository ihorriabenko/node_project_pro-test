const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const {
  validateBody,
  authenticate,
  authenticateSocial,
  uploadMiddleware,
} = require("../../middlewares");
const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         email: user@mail.com
 *         password: test1234
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *    summary: Returns verificationToken
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/src/models/User'
 *    responses:
 *      200:
 *        description: The verificationToken
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 */

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.getVerify))

router.post("/verify", validateBody(schemas.reVerify), ctrlWrapper(ctrl.reVerify))

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  uploadMiddleware.single("avatar"),
  authenticate,
  ctrlWrapper(ctrl.updateAvatar)
);

router.get(
  "/google",
  authenticateSocial.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  authenticateSocial.authenticate("google", { session: false }),
  ctrlWrapper(ctrl.googleUser)
);

router.get(
  "/facebook",
  authenticateSocial.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);

router.get(
  "/facebook/callback",
  authenticateSocial.authenticate("facebook", { session: false }),
  ctrlWrapper(ctrl.facebookUser)
);

module.exports = router;