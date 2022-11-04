import React, {useState, useRef} from "react";
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'

import useStyles from './styles'
import { commentPost, deleteComment, editComment } from '../../actions/posts'

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditId, setCurrentEditId] = useState("");

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async () => {
        const sentComment = {
            commentId: uuid(),
            authorId: user?.result._id || user?.result.sub ,
            name: user?.result.name || user?.result.given_name,
            text: comment
        }

        const newComments = await dispatch(commentPost(sentComment, post._id));

        setIsEditing(false);
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const handleEdit = async (comment) => {
        setIsEditing(true);
        setCurrentEditId(comment.commentId);
        setComment(comment.text)
    }

    const submitEdit = async () => {
        const value = {
            commentId: currentEditId,
            text: comment
        }

        const editedComment = await dispatch(editComment(value, post._id));
        
        setIsEditing(false);
        setComment('');
    }

    const handleDelete = async (commentId) => {
        setIsEditing(false);
        const updatedComments = await dispatch(deleteComment(commentId, post._id));
        setComments(updatedComments);
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer} >
                <div className={classes.commentsInnerContainer} >
                    <Typography gutterBottom variant="h6">Comments</Typography>

                    { comments?.map((comment, index) => {
                        return (comment?.authorId === user?.result._id || comment?.authorId === user?.result.sub) ? (
                            <div key={index} >
                                <Typography gutterBottom variant="subtitle1">
                                    <strong>{comment.name}:</strong>
                                    &nbsp;{comment.text}
                                </Typography>
                                
                                { (isEditing && currentEditId === comment.commentId) ? 
                                    <button onClick={() => {setIsEditing(false); setComment('')}} style={{cursor: 'pointer'}}>
                                        Cancel
                                    </button>
                                    :
                                    <button onClick={() => handleEdit(comment)} style={{cursor: 'pointer'}}>Edit</button>
                                }
                                <button onClick={() => handleDelete(comment.commentId)} style={{cursor: 'pointer'}}>Delete</button>
                            </div>
                            ) : (
                            <div key={index} >
                                <Typography gutterBottom variant="subtitle1">
                                    <strong>{comment.name}:</strong>
                                    &nbsp; {comment.text}
                                </Typography>
                            </div>
                            )
                    }) }
                    <div ref={commentsRef} />
                </div>


                {(user?.result?.name || user?.result?.given_name) ? (
                    <div style={{width: '70%'}}>
                        <Typography gutterBottom variant="h6">{isEditing ? 'Editing Comment' : 'Write a Comment'}</Typography>                 

                        <TextField
                            fullWidth
                            minRows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value) }
                        />

                        <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={isEditing ? submitEdit :  handleClick }  >
                            Send
                        </Button>
                    </div>
                ) :
                (
                    <Typography gutterBottom variant="h6">Log-in to comment!</Typography>
                )
            }
            </div>
        </div>
    )
}

export default CommentSection;