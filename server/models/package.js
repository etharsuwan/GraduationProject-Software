const mongoose=require('mongoose');
// import {findVisible} from './findVisible';

const PackageSchema= new mongoose.Schema({
    packageid:{type: String,unique: true,required: true},
    userId:{type:mongoose.Schema.Types.ObjectId , ref:'customers',required: true },
    driver:{type:mongoose.Schema.Types.ObjectId,ref:'Drivers'},
    recipient:{ type: String, trim: true},
    sender:{ type: String, trim: true},
    recipientEmail: {type : String,trim: true},
    recipientPhone:{type: String, trim: true },
    recipientlatitude:{type: String, trim: true },
    recipientlongitude:{type: String, trim: true },
    senderlatitude:{type: String,trim: true},
    senderlongitude:{type: String,trim: true},
    driverlatitude:{type: Number},
    driverlongitude:{type: Number},
    deliveryDate: {type: Date,trim: true},
    arrived:{type:Boolean , default:"false"},
    shipped:{type:Boolean , default:"false"},
    description:{type: String   },
    isVisible :{type:Boolean, default:true},
    customer_address:{type:String, unique:false},

      to_address:{type:String, unique:false},
    createAt:{type:Date},


},
    { timestamps: true })




const Packages=mongoose.model('packages',PackageSchema,'packages');
module.exports=Packages;