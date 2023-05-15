const mongoose = require('mongoose');
const {Schema } = mongoose;
console.log('innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
const DriverSchema = new Schema(
{
   
 
    name: { type: String, required: true},
    driverlatitude:{type: Number,trim: true},
    driverlongitude:{type: Number,trim: true},
email: {
type: String,
trim: true,
required: true,
unique: true,
},
phone: {
    type: String,
    required: true,
unique: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
        },
    
    license:{
        type: String,
        trim: true,
        required: true,
    },
    
password: {
type: String,
required: true,
 min: 6,
max: 64,
},

 role: {
type: String,
 default: "driver",
},

resetCode: "",
approved:{type:Boolean,
default:false}
},
{ timestamps: true }
);

module.exports = mongoose.model.Drivers||mongoose.model("Drivers", DriverSchema);