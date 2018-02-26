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
    default: 'https://storage.googleapis.com/nonohyes20180219/favicon/no_image.png',
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
