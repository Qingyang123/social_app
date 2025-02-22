import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import MyButton from '../../util/MyButton';

// MUI
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';

// Icon
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { connect } from 'react-redux';
import { deleteScream } from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '9%'
    }
}

class DeleteScream extends Component {

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open:true })
    }

    handleClose = () => {
        this.setState({ open:false })
    }

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open:false })
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip='Delete Scream' onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color='secondary'/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Are you sure you want to delete the scream?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                        <Button onClick={this.deleteScream} color='secondary'>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}


DeleteScream.propTypes = {
    classes: PropTypes.object.isRequired,
    deleteScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired
};

const mapActionsToProps = {
    deleteScream
}

export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteScream));