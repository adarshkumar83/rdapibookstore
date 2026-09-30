const Availability = require("../models/Availability");


// ADD / UPDATE PRODUCT AVAILABILITY
const addAvailability = async (req, res) => {
  try {
    const {
      bookId,
      pincode,
      isAvailable
    } = req.body;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Please select a book"
      });
    }

    if (!pincode) {
      return res.status(400).json({
        success: false,
        message: "Please enter pincode"
      });
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      return res.status(400).json({
        success: false,
        message: "Pincode must be 6 digits"
      });
    }


    const availability =
      await Availability.findOneAndUpdate(
        {
          bookId: bookId,
          pincode: pincode
        },
        {
          bookId: bookId,
          pincode: pincode,
          isAvailable:
            isAvailable !== undefined
              ? isAvailable
              : true
        },
        {
          new: true,
          upsert: true,
          runValidators: true
        }
      );


    res.status(200).json({
      success: true,
      message: "Product availability added successfully",
      data: availability
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



// GET ALL AVAILABILITY
const getAvailability = async (req, res) => {
  try {

    const availability =
      await Availability.find()
        .populate("bookId", "bookTitle");

    res.status(200).json({
      success: true,
      data: availability
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



module.exports = {
  addAvailability,
  getAvailability
};