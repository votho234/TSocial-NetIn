import PostModel from '../Models/Post.js';
import CommentModel from '../Models/Comment.js';

class CommentCtrl {
   async create(req, res) {
      try {
         const { postId, content, reply } = req.body;

         const post = await PostModel.findById(postId);

         if (!post) return res.status(400).json({ message: 'This post does not exist.' });

         if (reply) {
            const cm = await CommentModel.findById(reply);
            if (!cm)
               return res.status(400).json({ message: 'This comment does not exist.' });
         }

         const newComment = new CommentModel({
            user: req.userLogin._id,
            postId,
            content,
            reply,
         });

         await PostModel.findOneAndUpdate(
            { _id: postId },
            {
               $push: { comments: newComment._id },
            },
            { new: true }
         );

         await newComment.save();

         const comment = await CommentModel.findById({ _id: newComment._id }).populate(
            'user likes',
            'username avatar firstname lastname'
         );

         res.json({ newComment: comment });
      } catch (err) {
         return res.status(500).json({ message: err.message });
      }
   }
   async delete(req, res) {
      try {
         const comment = await CommentModel.findOneAndDelete({
            _id: req.params._id,
         });

         await PostModel.findOneAndUpdate(
            { _id: comment.postId },
            {
               $pull: { comments: req.params.id },
            }
         );
         res.status(200).json({ message: 'Deleted Comment!' });
      } catch (err) {
         return res.status(500).json({ message: err.message, err });
      }
   }
   async update(req, res) {
      try {
         await CommentModel.findOneAndUpdate({ _id: req.params._id }, req.body);
         res.status(200).json({ message: 'Update Success!' });
      } catch (err) {
         return res.status(500).json({ message: err.message });
      }
   }
   async likeComment(req, res) {
      try {
         const comment = await CommentModel.find({
            _id: req.params._id,
            likes: req.userLogin._id,
         });
         if (comment.length > 0)
            return res.status(400).json({ msg: 'You liked this post.' });

         await CommentModel.findOneAndUpdate(
            { _id: req.params._id },
            {
               $push: { likes: req.userLogin._id },
            },
            { new: true }
         );

         res.json({ message: 'Liked Comment!' });
      } catch (err) {
         return res.status(500).json({ message: err.message });
      }
   }
   async unLikeComment(req, res) {
      try {
         await CommentModel.findOneAndUpdate(
            { _id: req.params._id },
            {
               $pull: { likes: req.userLogin._id },
            },
            { new: true }
         );
         res.json({ message: 'UnLiked Comment!' });
      } catch (err) {
         return res.status(500).json({ message: err.message });
      }
   }
}

export default new CommentCtrl();
