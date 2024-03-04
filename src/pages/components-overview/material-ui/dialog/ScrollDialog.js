import { useState, useRef, useEffect } from 'react';
// material
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import ParentBuilderForm from 'src/components/_dashboard/rosters/ParentBuilderForm';
import { makeStyles } from '@material-ui/styles';

// Define the styles using your theme overrides
const useStyles = makeStyles((theme) => ({
    containedError: {
        // Apply the custom style you defined in your theme
        backgroundColor: theme.customShadows.error
    }
}));

// ----------------------------------------------------------------------

export default function ScrollDialog(props) {
    const { open, setOpen, handleSubmit } = props;
    const classes = useStyles();
    const [scroll] = useState('body');

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Dialog
                open={open}
                maxWidth={'sm'}
                // onClose={handleClose}
                scroll={scroll}
                fullWidth={true}
            >
                <DialogTitle sx={{ pb: 2 }}>Create Roster</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <ParentBuilderForm
                        rosterData={[]}
                        type={'dialog'}
                        handleSave={handleSubmit}
                        setLoading={props?.setLoading}
                        handleClose={handleClose}
                    />
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button className={classes.containedError} onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
