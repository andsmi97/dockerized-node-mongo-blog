const passport = require('passport');
const User = require('../Schemas/User');

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.payload.id);
    if (user.validatePassword(currentPassword)) {
      user.setPassword(newPassword);
      await user.save();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(400).json('Неправильный пароль');
    }
  } catch (e) {
    return res.status(403);
  }
};

const getCredentials = async (req, res) => {
  try {
    const user = await User.findById(req.payload.id);
    if (!user) {
      return res.sendStatus(401);
    }
    return res.json({
      user: {
        ...user.toAuthJSON(),
      },
    });
  } catch (e) {
    return res.sendStaus(403);
  }
};

const register = async (req, res) => {
  const { username, email, password, phone, MAIL } = req.body.user;
  const user = new User({ username, email, phone, MAIL });
  user.setPassword(password);
  try {
    await user.save();
    return res.status(200).json({ user: user.toAuthJSON() });
  } catch (e) {
    console.log(e);
    return res.sendStatus(403);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body.user;
  if (!email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }
  if (!password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
};

module.exports = {
  login,
  register,
  getCredentials,
  updatePassword,
};
