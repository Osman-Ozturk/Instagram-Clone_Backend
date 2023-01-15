

import User from "../models/User.js";
import Post from "../models/Post.js";

const createPost = async (req, res) => {
  const newPost = await Post.create(req.body);
  try {
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ userId: req.params.id });
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The Post has been updated!");
    } else {
      res.status(403).json("You can update only your post!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ userId: req.params.id });
    if (post) {
      await Post.findOneAndDelete({userId:req.params.id});
      res.status(200).json("The Post has been deleted!");
    } else {
      res.status(403).json("You can delete only your post!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getPost =async (req,res)=>{
        try {
                const post = await Post.findById(req.params.id );
                post ? res.status(201).json(post):res.status(403).json('The post not found')
                   
        } catch (error) {
                res.status(500).send(error);   
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
               const user = await User.findOne({userName : req.params.username}) 
               const posts = await Post.find({userId:user._id})
               res.status(201).json(posts)
        } catch (error) {
                res.status(500).send(error)
        }
}


export { createPost, updatePost, deletePost ,getPost , getAllPost,getUserAllPosts};