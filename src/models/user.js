const {Schema, model} = require('mongoose');

// Регулярное выражение для проверки корректности email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Регулярное выражение для проверки сложности пароля
// Требования: минимум 8 символов, хотя бы одна буква в верхнем регистре, одна в нижнем регистре, одна цифра и один специальный символ
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
            return emailRegex.test(v);
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
            return passwordRegex.test(v);
        },
        message:
          'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one digit, and one special character',
      },
    },
});

const User = model('User', userSchema);

User.findByEmail = async (email, cb) => {
  try {
    const user = await User.findOne({ email });
    return cb(null, user);
  } catch (err) {
    return cb(err, null);
  }
};

User.findById = async (id, cb) => {
  try {
    const user = await User.findById(id);
    return cb(null, user);
  } catch (err) {
    return cb(err, null);
  }
};

User.verifyPassword = (user, password) => {
  return user.password === password;
};

module.exports = User;