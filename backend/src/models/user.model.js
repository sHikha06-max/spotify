const jwt = require("jsonwebtoken");  //joi joi-password-complexity
const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    gender:{type:String,required:true},
    likedSongs:{type:[String],default:[]},
    playedSongs:{type:[String],default:[]},
    isAdmin:{type:Boolean,default:false}
},{
    versionKey:false,
    timestamps:true
});

const validate = (user)=>{
    const schema = joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:passwordComplexity().required(),
        gender:joi.string().valid("male","female","other").required()
        
    });

    return schema.validate(user);
}


userSchema.methods.generateAuthToken =    function () {
    const token=jwt.sign({_id:this._id,name:this.name,isAdmin:this.isAdmin},
         process.env.JWTPRIVATEKEY, { expiresIn: '7d' });
         return token;
  }

const users = mongoose.model('user',userSchema);

module.exports={users,validate};

