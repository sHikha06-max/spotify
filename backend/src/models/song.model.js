const mongoose = require("mongoose");
const joi =  require("joi");

const songSchema = new mongoose.Schema({
    name:{type:String,require:true},
    artist:{type:String,require:true},
    genre:{type:String,require:true},
    img:{type:String,require:true},
    duration:{type:Number,require:true},

},{
    versionKey:false,
    timestamps:true
});

const validate = (song)=>{
    const schema = joi.object({
        name:joi.string().required(),
        artist:joi.string().required(),
        genre:joi.string().required(),
        img:joi.string().required(),
        duration:joi.number().required()
    });

    return schema.validate(song);
}

const songs = mongoose.model('song',songSchema);

module.exports= {songs,validate};
