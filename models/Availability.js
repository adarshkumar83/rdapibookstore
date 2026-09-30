const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const availabilitySchema = new Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

availabilitySchema.index(
  { bookId: 1, pincode: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "Availability",
  availabilitySchema
);