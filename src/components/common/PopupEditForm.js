import React, {useState} from 'react';
import {firestore} from "../../Firebase/firebaseSetup";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import {useForm} from "react-hook-form";

const PopupEditForm = ({isOpen, setIsOpen,imgSrc,desc,count,height,width,weight,name,comments}) => {
    let [img,setImg] = useState(imgSrc);
    let [description,setDescription] = useState(desc);
    let [coun,setCount] = useState(count);
    let [heigh,setHeight] = useState(height);
    let [widt, setWidth] = useState(width);
    let [weigh, setWeight] = useState(weight);

    const {register, handleSubmit} = useForm();

    const changeProduct = async (data) => {
        let {name, imageURL,count,weight, description,width,height} = JSON.parse(data);

        let changedObj = {
            imageUrl: imageURL,
            name: name,
            count: count,
            size: {
                width: width,
                height: height
            },
            weight: weight,
            description: description,
            comments: comments
        };

        let prodRef = await firestore.collection('products').where('name', '==', name).get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.update(changedObj);
            });

        setIsOpen(false);

    }
    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Редагувати продукт</DialogTitle>

                <form onSubmit={handleSubmit((data) => changeProduct(JSON.stringify(data)))}>
                    <DialogContent>
                        <DialogContentText>
                            Щоб редагувати продукт, введіть, будь ласка необхідні дані
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
                                    value={name || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="imageURL"
                                    name="imageURL"
                                    label="Адрес зображення"
                                    value={img || ''}
                                    onChange={e => setImg(e.target.value)}
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
                                    value={coun || ''}
                                    onChange={e => setCount(e.target.value)}
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
                                    value={weigh || ''}
                                    onChange={e=> setWeight(e.target.value)}
                                    endAdornment={<InputAdornment position="end">g</InputAdornment>}
                                    inputRef={register({ min: 1, max: 20000 })}
                                    fullWidth

                                />
                                <TextField
                                    required
                                    id="description"
                                    name="description"
                                    label="Опис продукту"
                                    value={description || ''}
                                    onChange={e => setDescription(e.target.value)}
                                    inputRef={register({pattern: /\w+/})}
                                    fullWidth
                                />
                                <Grid container justify={"space-between"}>
                                    <TextField
                                        required
                                        id="height"
                                        name="height"
                                        label="Висота"
                                        value={heigh || ''}
                                        onChange={e => setHeight(e.target.value)}
                                        inputRef={register({min: 10, max: 20000,pattern: /\d+/})}
                                    />
                                    <TextField
                                        required
                                        id="width"
                                        name="width"
                                        label="Ширина"
                                        value={widt || ''}
                                        onChange={e => setWidth(e.target.value)}
                                        inputRef={register({min: 10, max: 20000,pattern: /\d+/})}
                                    />
                                </Grid>
                            </Grid>

                        </Grid>
                        {/*<Button type={'submit'}>Yo</Button>*/}

                    </DialogContent>
                    <DialogActions>
                        <Button startIcon={<SaveIcon />} type={'submit'}  color="primary">
                            редагувати
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

export default PopupEditForm;