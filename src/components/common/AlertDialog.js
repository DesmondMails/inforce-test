import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {firestore} from '../../Firebase/firebaseSetup';

const AlertDialog = (props) => {
    const { name,isOpen, setIsOpen } = props;

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDelete = async ()  => {
        firestore.collection('products').where("name", "==", name).get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
            });

        setIsOpen(false);
    };

    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClose}>
          Confrim
        </Button> */}
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Видалити продукт ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ви точно хочете видалити продукт?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ні
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Так
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertDialog;