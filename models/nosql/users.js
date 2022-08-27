const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete')

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        age:{
            type:Number
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            select: false
        },
        role:{
           type:["user", "admin"],
           default: "user"
        }
    },
    {   // Campo para marcas de tiempo createdAt, updatedAt
        timestamps:true,
        versionKey:false
    }
)

UserSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("users", UserSchema)
