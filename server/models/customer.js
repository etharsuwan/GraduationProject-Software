const mongoose = require('mongoose');
const {Schema } = mongoose;
console.log('innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
const CustomerSchema = new Schema(
{
 
    name: { type: String, required: true},

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
    
    
    
password: {
type: String,
required: true,
 min: 6,
max: 64,
},
 role: {
type: String,
 default: "customer",
},

resetCode: {
    type: String,

},
},
{ timestamps: true }
);

module.exports = mongoose.model.Customers || mongoose.model("Customers", CustomerSchema);
