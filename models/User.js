import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
        {
             fullName : {
                type :String,
                default:''
             } ,
             userName : {
                type :String,
                require:true,
                min:3,
                max:20,
                unique : true,
             },
             email : {
                type :String,
                required:true,
                max:50,
                unique : true,
             } ,
             password : {
                type :String,
                required:true,
                min:3,
                max:20,
             } ,
             handyNummer : {
                type :String,
                max:100,
                required:true
             }  ,
             profilePicture : {
                type :String,
                default:''
             },
             followers:{
                type:Array,
                default:[]
             },
             followings:{
                type:Array,
                default:[]
             },
             isAdmin:{
                type:Boolean,
                default:false
             },
             desc : {
                type :String,
                default:''
             },
        },{timestamps:true}
)
 const User = mongoose.model('User',UserSchema);
 export default User;