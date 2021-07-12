const { model, Schema } = require('mongoose');

module.exports = model(
  'Product',
  new Schema({
    description: { required: true, type: String },
    options: [
      {
        optionName: { required: false, type: String },
        optionValue: { required: false, type: String },
      },
    ],
    name: { required: true, type: String },
    price: { required: true, type: Number },
  }),
);
