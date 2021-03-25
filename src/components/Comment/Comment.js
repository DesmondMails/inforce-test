import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import Typography from "@material-ui/core/Typography";
import {firestore} from "../../Firebase/firebaseSetup";
import firebase from "firebase";

const Comment = ({productId, comments, name}) => {
    let [value, setValue] = useState('');

    const sendComment = async () => {
        let commentObj = {
            productId: productId,
            description: value,
            date: new Date().toLocaleString(),
        };

        firestore.collection('products').where('name', '==', name).get()
             .then(querySnapshot => {
            querySnapshot.docs[0].ref.update({
                comments: firebase.firestore.FieldValue.arrayUnion(commentObj)

            });
        });

        setValue('');
    };

    return (
        <Container>

            <Grid container
                  style={{height: window.innerHeight - 50, marginTop: 20}}
                  justify={"center"}
            >

                <Grid container
                      direction={"column"}
                      alignItems={"flex-end"}
                      style={{width: '80%'}}
                >
                    <Typography variant={'h5'} gutterBottom>
                        Додати коментар
                    </Typography>
                    <TextField
                        fullWidth
                        rowsMax={3}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button startIcon={<SendIcon />} onClick={sendComment} color={"primary"} variant={"outlined"}>Відправити</Button>
                </Grid>
                <div style={{width: '80%', height: '70vh',border: '1px solid gray',overflowY: 'auto'}}>
                    {comments.length > 0 &&  comments.map((comment,id) =>
                        <div id={id}
                            style={{
                            margin: 10,
                            marginLeft: 'auto',
                            width: 'auto',
                            boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 5,
                        }}>
                            <div>{comment.description}</div>
                            <div>{comment.date}</div>
                        </div>
                    )}
                </div>
            </Grid>
        </Container>
    );
};

export default Comment;