const mongoose = require('mongoose');
const {Schema } = mongoose;
console.log('innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');

const PackageSchema = new Schema({ 
    
   packageid:{
    type: String,
    unique: true,
    required: true,
},
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: true      ,
                    },
                    driver: {
                        type: String,
                        ref: 'Drivers',

                        default: "null",

                      },
    recipient: { 
        type: String,
        trim: true
        },
        sender: { 
            type: String,
            trim: true
            },
            packageType: { 
                type: String,
                trim: true
                },

    packageWeight: {
        type:Number,
        trim:true
    },
            recipientEmail:{
                type: String,
                trim: true
            },
        recipientPhone:{
            type: String,
            trim: true
        },
        recipientlatitude:{
            type: String,
            trim: true

        },
        recipientlongitude:{
            type: String,
            trim: true

        },
        
        senderlatitude:{
            type: String,
            trim: true

        },
        senderlongitude:{
            type: String,
            trim: true

        },
        driverlatitude:{
            type: String,
            trim: true,
            default: "null",


        },
        driverlongitude:{
            type: String,
            trim: true,
            default: "null",


        },
            deliveryDate: { 
                type: Date,
                trim: true
                },
               
    });
    module.exports = mongoose.model.Packages || mongoose.model("Packages", PackageSchema);
