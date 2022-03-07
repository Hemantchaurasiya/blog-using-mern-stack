const router = require("express").Router();

const { newComment, getComments, deleteComment,deletePostAllComment } = require("../controllers/comment");
const {createPost,updatePost,deletePost,getPost,getAllPosts} = require("../controllers/post");
const {register,login} = require("../controllers/auth");

router.post('/create', createPost);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);

router.get('/post/:id', getPost);
router.get('/posts', getAllPosts);

router.post('/comment/new', newComment);
router.get('/comments/:id', getComments);
router.delete('/comment/delete/:id', deleteComment);
router.delete('/comment/deleteAll/:id', deletePostAllComment);

router.post('/register',register);
router.post('/login',login);


module.exports = router;