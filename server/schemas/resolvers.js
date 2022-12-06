const{User}=require('../models');
const {signToken}=require('../utils/auth');

const resolvers={
    Query:{
        users: async()=>{
            return await User.find({});
        },
        me: async(parent,args,context)=>{
            return await User.findOne({_id:context.user._id});
        },
    },

    Mutation:{
        addUser:async (parent,args)=>{
            const user=await User.create(args);
            const token=signToken(user);
            return {token,user};
        },

        login:async(parent,{email,password})=>{
            const user=await User.findOne({
                $or:[{username:email},{email:email}],
            })
            if(!user){
                return{message:'No user found'}
            }
            const correctPw=await user.isCorrectPassword(password);
            if(!correctPw){
                return {message:"Incorrect Password"};
            }
            const token=signToken(user);
            return {token,user};
        },

        saveBook:async (parent,args,context)=>{
            return await User.findOneAndUpdate(
                {_id:context.user._id},
                {$addToSet:{savedBooks:{...args}}},
                {new:true,runValidators:true}
            );
        },

        removeBook:async (parent,{bookid},context)=>{
            return await User.findOneAndUpdate(
                {_id:context.user._id},
                {$pull:{savedBooks:{bookId:bookid}}},
                {new:true}
            );
        }
    }
};

module.exports=resolvers