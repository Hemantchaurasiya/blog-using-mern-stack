import React, { useState, useEffect } from 'react';
import { Box, makeStyles, TextareaAutosize, Button, FormControl, InputBase } from '@material-ui/core';
import { AddCircle as Add } from '@material-ui/icons';
import { useHistory,useParams } from 'react-router-dom';
import { updatePost, getPost } from '../http/api';
import storage from '../http/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    title: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    textfield: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        fontSize: 18,
        '&:focus-visible': {
            outline: 'none'
        }
    }
}));

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date()
}

const UpdatePost = () => {
    const classes = useStyle();
    const history = useHistory();
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { id } = useParams();
    const [imageURL, setImageURL] = useState('https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80');
        
    useEffect(() => {
        const fetchData = async () => {
            let data = await getPost(id);
            setPost(data);
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const UploadImage = async () => {
            if (file) {
                const fileName = Date.now() + file.name;
                post.picture = fileName;
                try {
                    // file upload in firebase store
                    const storageRef = ref(storage, `/items/${fileName}`);
                    uploadBytes(storageRef, file).then((snapshot) => {
                        // get image in firebase
                        getDownloadURL(ref(storage, `gs://blog-7af03.appspot.com/items/${post.picture}`))
                            .then((url) => {
                                setImageURL(url);
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    });
                } catch (err) { console.log(err) }
            }
        }
        UploadImage();
    }, [file,post])

    const updateBlogPost = async () => {
        await updatePost(id, post);
        history.push(`/details/${id}`);
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Box className={classes.container}>
            <img src={imageURL} alt="post" className={classes.image} />

            <FormControl className={classes.title}>
                <label htmlFor="fileInput">
                    <Add className={classes.addIcon} fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputBase onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" className={classes.textfield} />
                <Button onClick={() => updateBlogPost()} variant="contained" color="primary">Update</Button>
            </FormControl>

            <TextareaAutosize
                rowsMin={5}
                placeholder="Tell your story..."
                className={classes.textarea}
                name='description'
                onChange={(e) => handleChange(e)} 
                value={post.description}
            />
        </Box>
    )
}

export default UpdatePost;