import mongoose from 'mongoose';

const { Schema } = mongoose;
const App = new Schema({
  domain: {
    type: String,
    required: true,
  },
  favicon: {
    type: String,
  },
  title: {
    type: String,
  },
});
const model = mongoose.model('app', App);

export default model;
