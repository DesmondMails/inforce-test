import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useForm} from "react-hook-form";
import InputAdornment from "@material-ui/core/InputAdornment";
import {firestore} from "../../Firebase/firebaseSetup";
import SaveIcon from '@material-ui/icons/Save';
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";

const PopupForm = ({isOpen, setIsOpen}) => {

    const {register, handleSubmit} = useForm();
    const addProduct = async (data) => {
       let {name, imageURL,count,weight, description,width,height} = JSON.parse(data);
       // alert(`name is ${name} url is ${imageURL} count = ${count} weight = ${weight} price = ${price}`);
       const doc_key = await firestore.collection('products').add({

            imageUrl: imageURL,
            name: name,
            count: count,
            size: {
                width: width,
                height: height
            },
            weight: weight,
            description: description,
            comments: []
        });

        setIsOpen(false);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Додати продукт</DialogTitle>

                <form onSubmit={handleSubmit((data) => addProduct(JSON.stringify(data)))}>
                <DialogContent>
                    <DialogContentText>
                        Щоб додати продукт, введіть, будь ласка необхідні дані
                    </DialogContentText>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                inputRef={register({pattern: /\w+/})}
                                label="Назва продукту"
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="imageURL"
                                name="imageURL"
                                label="Адрес зображення"

                                inputRef={register({pattern: /(http(s?):)+/g})}
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="count"
                                name="count"
                                label="Кількість продукції"

                                inputRef={register({ min: 0, max: 1000,pattern: /\d+/ })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="weight"
                                name="weight"
                                label="Вага продукту"

                                endAdornment={<InputAdornment position="end">g</InputAdornment>}
                                inputRef={register({ min: 1, max: 20000 })}
                                fullWidth

                            />
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="Опис продукту"

                                inputRef={register({pattern: /\w+/})}
                                fullWidth
                            />
                            <Grid container justify={"space-between"}>
                                <TextField
                                    required
                                    id="height"
                                    name="height"
                                    label="Висота"

                                    inputRef={register({min: 10, max: 20000,pattern: /\d+/})}
                                />
                                <TextField
                                    required
                                    id="width"
                                    name="width"
                                    label="Ширина"
                                    inputRef={register({min: 10, max: 20000,pattern: /\d+/})}
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                        {/*<Button type={'submit'}>Yo</Button>*/}

                </DialogContent>
                <DialogActions>
                    <Button startIcon={<SaveIcon />} type={'submit'}  color="primary">
                        додати
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Скасувати
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default PopupForm;