import mongoose from 'mongoose';

const { Schema } = mongoose;
const App = new Schema({
  isHttps: Boolean,
  domain: {
    type: String,
    required: true,
  },
  path: {
    type: String,
  },
  favicon: {
    type: String,
  },
  title: {
    type: String,
  },
});
App.index({
  isHttps: 1,
  domain: 1,
  path: 1,
}, {
  unique: true,
});
const model = mongoose.model('app', App);

export default model;
