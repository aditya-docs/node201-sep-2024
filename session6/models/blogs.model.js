const mongoose = require("mongoose");
const validator = require("validator");

const blacklistedEmailDomains = ['gmail.com']

const authorSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, "Author's full name is required"], maxLength: 50 },
  email: { 
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
    validate: {
      validator: value => validator.isEmail(value, { host_blacklist: blacklistedEmailDomains }),
      message: props => {
        if(props.value.includes("gmail.com"))
          return `${props.value} is a personal email address. Please use your business email!`
        return `${props.value} is not a valid email address!`
      } 
    }
  },
  twitterHandle: String,
  image: { 
    type: String,
    validate: {
      validator: value => validator.isURL(value, { protocols: ["https"] }),
      message: props => `${props.value} is not a valid URL!`
    }
  } 
},
{
  _id: false
})

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: [authorSchema] },
    content: { type: String, default: "" },
    publishedAt: { type: Date, default: null },
  },  
  {
    timestamps: true,
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const blogModel = mongoose.model("Blog", blogSchema, "blogs"); //(name of the model, schema to be used, name of the collection)

module.exports = blogModel;
