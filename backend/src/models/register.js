const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  aadhar: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
  voted: [
    {
      vote: {
        type: Boolean,
        default: false,
      },
      party: {
        type: String,
        require: true,
      },
    },
  ],
  voteStatus: {
    type: Boolean,
    default: false,
  },
});

// Generating jwt token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err.message);
    console.log("could not create token");
    res.status(400).send();
  }
};

//Voting time
userSchema.methods.voting = async function (parti) {
  try {
    if (this.voted.length >= 1) {
      console.log("Already voted");
      return this.voted.length;
    } else {
      console.log(this.voted.length);
      this.voted = this.voted.concat({ vote: true, party: parti });
      this.voteStatus = true;
      await this.save();
      return this.voted;
    }
  } catch (e) {
    console.log(e.message);
    return "cannot vote";
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Register = new mongoose.model("Register", userSchema);
module.exports = Register;
