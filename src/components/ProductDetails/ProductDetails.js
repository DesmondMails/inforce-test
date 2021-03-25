import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import SaveIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import Comment from "../Comment/Comment";
import {withRouter} from "react-router-dom";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {firestore} from "../../Firebase/firebaseSetup";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import PopupForm from "../common/PopupForm";
import PopupEditForm from "../common/PopupEditForm";

const useStyles = makeStyles((theme) => ({
    img: {
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
    }
}));

const ProductDetails = ({match, location, history}) => {
    const {img} = useStyles();
    const {id, name} = match.params;

    const [openPopup, setOpenPopup] = useState(false);

    const [product, loading] = useCollectionData(
        firestore.collection('products').where('name', '==', name)
    );

    const handleOpenNew = () => {
        setOpenPopup(true);
    };

    if (loading){
        return <CircularProgress aria-orientation={"vertical"}/>
    }


    return (

        <Container>
            <Grid container
                  spacing={24}
                  align={'center'}
                  style={{paddingTop: 80}}
            >
                <Grid item
                      xs={4}
                      className={img}
                >
                    <CardMedia
                        component="img"
                        alt="product img"

                        image={product[0].imageUrl}
                        title="product img"
                    />
                </Grid>
                <Grid item
                      xs={4}
                >
                    <Typography gutterBottom variant="h4" component="h5">
                        Опис товару
                    </Typography>
                    <Grid container style={{paddingLeft: 30}} direction={"column"}>
                        <Typography gutterBottom variant={'h6'}>
                            {product[0].description}
                        </Typography>
                        <Typography variant={'subtitle1'} align={'justify'}>
                            Назва: <strong>{product[0].name}</strong>
                        </Typography>
                        <Typography variant={'subtitle1'} align={'justify'}>
                            Кількість товару: <strong>{product[0].count}</strong>
                        </Typography>
                        <Typography variant={'subtitle1'} align={'justify'}>
                            Розмір: <strong>{product[0].size.height}х{product[0].size.width}</strong>
                        </Typography>
                        <Typography variant={'subtitle1'} align={'justify'}>
                           Вага: <strong>{product[0].weight}</strong>
                        </Typography>
                    </Grid>
                    <Button style={{justifySelf: 'flex-end'}} startIcon={<EditIcon />} onClick={handleOpenNew} variant={"contained"}  color="primary">
                        Редагувати
                    </Button>
                </Grid>
                {openPopup && (
                    <PopupEditForm
                        isOpen={openPopup}
                        setIsOpen={setOpenPopup}
                        imgSrc={product[0].imageUrl}
                        desc={product[0].description}
                        count={product[0].count}
                        height={product[0].size.height}
                        width={product[0].size.width}
                        weight={product[0].weight}
                        name={product[0].name}
                        editMode={true}
                        comments={product[0].comments}
                    />
                )}

            </Grid>
            <Comment name={name} productId={id} comments={product[0].comments.reverse()}/>
        </Container>
    );
};

export default withRouter(ProductDetails);