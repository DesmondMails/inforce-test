import React, {useEffect, useState} from 'react';
import ProductCard from "./ProductCard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {firestore} from "../../Firebase/firebaseSetup";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import PopupForm from "../common/PopupForm";
import {withRouter} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        paddingBottom: 10,
    },
    button: {
        display: 'flex',

    }
}));

const ProductList = () => {
    const [typeOfSort, setTypeOfSort] = useState('');
    const [open, setOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);


    const [products, loading] = useCollectionData(
        firestore.collection('products')
    );

    const classes = useStyles();

    const handleChange = (event) => {
        let sortField = event.target.value;

        if (sortField === 'name'){
            products.sort((prev, next) => prev[sortField] > next[sortField] ? 1 : -1);
        }else if (sortField === 'count'){
            products.sort((prev,next) => prev[sortField] - next[sortField]);
        }
    };

    const handleCloseSort = () => {
        setOpen(false);
    };
    const handleOpenSort = (even) => {
        setOpen(true);
    };

    const handleOpenNew = () => {
        setOpenPopup(true);
    };

    if (loading) {
        return <CircularProgress aria-orientation={"vertical"}/>
    }

    return (
        <Container>
            <Typography
                color="textPrimary"
                gutterBottom
                variant="h2"
                align="center"
            >
                Product list
            </Typography>

            <Grid container justify={"space-between"}>
                <Grid>
                    <Button onClick={handleOpenNew} variant="contained" color={"primary"}
                            className={classes.button}>new</Button>
                </Grid>
                <FormControl className={classes.formControl}>
                    <InputLabel>Сортувати за</InputLabel>
                    <Select
                        open={open}
                        onClose={handleCloseSort}
                        onOpen={handleOpenSort}
                        value={typeOfSort}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>Без сортування</em>
                        </MenuItem>
                        <MenuItem value={'name'}>Назвою</MenuItem>
                        <MenuItem value={'count'}>Кількістю</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {openPopup && (
                <PopupForm isOpen={openPopup} setIsOpen={setOpenPopup}/>
            )}
            <Grid container spacing={3}>
                {
                    products.map((product, id) => (
                        <ProductCard
                            id={id}
                            name = {product.name}
                            imageURL={product.imageUrl}
                            count={product.count}
                            description={product.description}
                        />
                    ))
                }

            </Grid>
        </Container>
    );
};

export default withRouter(ProductList);