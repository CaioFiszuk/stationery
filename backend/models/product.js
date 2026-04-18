const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      enum: [
         'writing',
         'notebooks-and-pads',
         'school-supplies',
         'art-and-drawing',
         'organization',
         'general-stationery',
         'accessories',
         'gifts'
        ],
      required: true
    },
    brand: {
      type: String,
      trim: true
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      default: 20
    },
    images: {
      type: [String],
      default: []
   },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
