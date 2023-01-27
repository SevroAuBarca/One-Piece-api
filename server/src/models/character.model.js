import mongoose from "mongoose";
const { Schema } = mongoose;

const character = new Schema({
  name: String,
  age: String | Number,
  birthday: String,
  origin: String,
  status: String,
  bounty: String,
  image: {
    url: String,
    public_id: String,
    original_filename: String,
  },
  devil_fruit: String,
  affiliations: String,
  epiteth: String,
  resume: [String],
});

export const Character = mongoose.model("Character", character);
