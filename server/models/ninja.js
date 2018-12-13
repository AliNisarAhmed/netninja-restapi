const mongoose = require('mongoose');

// creating geolocatin schema

const GeoSchema = new mongoose.Schema({
  type: {
    default: "Point",
    type: String
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
})

const NinjaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  rank: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  geometry: GeoSchema
});

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;