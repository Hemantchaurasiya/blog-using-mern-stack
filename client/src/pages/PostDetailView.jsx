import { useState, useEffect } from 'react';
import { Box, makeStyles, Typography} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link, useHistory,useParams } from 'react-router-dom'
import { getPost, deletePost,deletePostAllComment } from '../http/api';
import Comments from '../components/Comments';
import { useSelector} from 'react-redux';
import { ref, getDownloadURL } from "firebase/storage";
import storage from '../http/firebase';

const useStyle = makeStyles(theme => ({
    container: {
        margin: '50px 100px',
        [theme.breakpoints.down('md')]: {
            margin: 0
        },
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        padding: 5,
        border: '1px solid #878787',
        borderRadius: 10
    },
    heading: {
        fontSize: 38,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px 0 10px 0'
    },
    author: {
        color: '#878787',
        display: 'flex',
        margin: '20px 0',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));


const PostDetailView = () => {
    const classes = useStyle();
    const history = useHistory();
    const [post, setPost] = useState({});
    const {user} = useSelector((state) => state.auth);
    const { id } = useParams();
    const [url, setUrl] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let data = await getPost(id);
            setPost(data);
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const getPicUrl = () => {
            if (post.picture) {
                getDownloadURL(ref(storage, `gs://blog-7af03.appspot.com/items/${post.picture}`))
                    .then((url) => {
                        setUrl(url);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }else{
                setUrl('https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')
            }
        }
        getPicUrl();
    }, [post])

    const deleteBlog = async () => {    
        await deletePost(post._id);
        deletePostAllComment(post._id);
        history.push('/')
    }

    return (
        <Box className={classes.container}>
            <img src={url} alt="post" className={classes.image} />
            <Box className={classes.icons}>
                {   
                    user !=null && user.user.username === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><Edit className={classes.icon} color="primary"/></Link>
                        <Link><Delete onClick={() => deleteBlog()} className={classes.icon} color="error" /></Link>
                    </>
                }
            </Box>
            <Typography className={classes.heading}>{post.title}</Typography>

            <Box className={classes.author}>
                <Link to={`/?username=${post.username}`} className={classes.link}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Box>

            <Typography className={classes.detail}>{post.description}</Typography>
            {user !=null && <Comments post={post} />}
        </Box>
    )
}

export default PostDetailView;