import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 40,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 40,
    },
    email: {
      type: String,
      required: true,
      max: 40,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    twitter:{
      type:String,
      default:"",
    },
    linkedin:{
      type:String,
      default:"",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
