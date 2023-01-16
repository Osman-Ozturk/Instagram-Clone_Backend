
import User from "../models/User.js";
import Post from "../models/Post.js";

const createPost = async (req, res,next) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error)
  }
};

const updatePost = async (req, res,next) => {
  try {
    const post = await Post.findById(req.params.id );
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(201).json("Der Post wurde aktualisiert!");
    } else {
      res.status(403).json("Sie können nur Ihren Post aktualisieren!");
    }
  } catch (error) {
    next(error)
  }
};

const deletePost = async (req, res,next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("Der Post wurde gelöscht !");
    } else {
      res.status(403).json("Sie können nur ihre eigenen Post löschen!");
    }
  } catch (error) {
    next(error)
  }
};
const getPost =async (req,res,next)=>{
        try {
                const post = await Post.findById(req.params.id );
                post ? res.status(201).json(post):res.status(403).json('The post not found')
                   
        } catch (error) {
                next()  
        }

}

const getAllPost = async (req,res) =>{
        try {
             const postList = await Post.find()  
             res.status(201).json(postList) 
        } catch (error) {
                res.status(500).send(error);   
        }
}



const getUserAllPosts = async (req,res)=>{
        try {
               const user = await User.findOne({userName : req.params.userName}) 
               const posts = await Post.find({userId:user._id})
               res.status(201).json(posts)
        } catch (error) {
                res.status(500).send(error)
        }
}

const getTimelinePosts = async (req,res,next)=>{
  try {
         const currentUser = await User.findById(req.params.userId) 
         const userPosts = await Post.find({userId:currentUser._id})
         const freundPosts =await Promise.all(
          currentUser.followings.map((freundId)=>{
            return Post.find({userId:freundId})
          })
         )
         res.status(201).json(userPosts.concat(...freundPosts))
  } catch (error) {
         next(error)
  }
}

// like und dislike Post

const likeDislikePost =async (req,res,next)=>{
  try {
         const post = await Post.findById(req.params.id)
         if (post.likes.includes(req.body.userId)) {
           await post.updateOne({$pull : {likes:req.body.userId}})
           res.status(201).json("der Post Like wurde entfernt")
         }else{
          await post.updateOne({$push : {likes:req.body.userId}})
           res.status(201).json("der Post wurde geliked")
         }
         
  } catch (error) {
         next(error)
  }
}

export { createPost, updatePost, deletePost ,getPost , getAllPost,getUserAllPosts,getTimelinePosts,likeDislikePost};