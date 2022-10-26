// const { User } = require("../../models/user");
// const { v4: uuidv4 } = require("uuid");
// const { RequestError } = require("../../helpers");
// const bcryptjs = require("bcryptjs");
// const { verifyMessage } = require("../../helpers");

// const resetData = async (req, res) => {
//   const { type } = req.params;
//   const { email } = req.body;

//   if (type === "password") {
//     const password = uuidv4().slice(0, 8);
//     const hashPassword = await bcryptjs.hash(password, 10);

//     const user = await User.findOneAndUpdate(
//       { email },
//       { password: hashPassword }
//     );

//     if (!user) {
//       throw RequestError(401, "Email is wrong");
//     }

//     const msg = {
//       to: email,
//       from: "riabenko.igor@gmail.com",
//       subject: "Reset password",
//       html: `<p>New password: ${password}</p><a href="${process.env.CLIENT_URL}" target="_blank">Login<a>`,
//     };

//     await verifyMessage(msg);
//   }

//   res.status(204).json({
//     message: "No Content",
//   });
// };

// module.exports = resetData;
