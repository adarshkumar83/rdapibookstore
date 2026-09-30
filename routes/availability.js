const express = require("express");

const router = express.Router();

const {
  addAvailability,
  getAvailability
} = require("../controllers/AvailabilityController");


// ADD AVAILABILITY
router.post(
  "/add/availability",
  addAvailability
);


// GET ALL AVAILABILITY
router.get(
  "/availability",
  getAvailability
);


module.exports = router;