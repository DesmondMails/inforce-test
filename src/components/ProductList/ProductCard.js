import React, {useState} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../common/AlertDialog';
import {firestore} from "../../Firebase/firebaseSetup";
import {NavLink} from "react-router-dom";

const ProductCard = ({id, name, imageURL, count, description}) => {
    const [deleteIcon, setDeleteIcon] = useState({show: false});
    const [openDialog, setOpenDialog] = useState(false);
    const deleteItem = () => (e) => {
        e.preventDefault();
        setOpenDialog(true);
    };
    return (
        <Grid item xs={12} sm={4}>
            <Card style={{
                maxWidth: 345,
                boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                backgroundColor: "#fafafa",
            }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="product img"
                        height="140"
                        image={imageURL}
                        title="product img"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                        <Typography variant="h6" color="textSecondary" component="h6">
                            Кількість: {count}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Grid container justify={"space-between"}>

                            <Button size="small" color="primary" component={NavLink} to={`/product/${id}/${name}`}>
                                Дізнатися більше
                            </Button>

                        <IconButton onClick={deleteItem(id)}>
                            <DeleteIcon color="secondary"/>
                        </IconButton>
                    </Grid>
                </CardActions>
            </Card>
            {openDialog && (
                <AlertDialog isOpen={openDialog} setIsOpen={setOpenDialog} name={name}/>
            )}
        </Grid>
    );
};

export default ProductCard;