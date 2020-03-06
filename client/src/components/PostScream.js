import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import MyButton from '../util/MyButton';

// MUI
import { Button, Dialog, DialogTitle, DialogActions, CircularProgress, DialogContent, TextField } from '@material-ui/core';

// Icon
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.textField,
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    }
})


class PostScream extends Component {

    state = {
        open: false,
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({
                errors: nextProps.ui.errors
            });
        }
        if (!nextProps.ui.errors && ! nextProps.ui.loading) {
            this.setState({ body: '', open: false, errors: {} });
            // this.handleClose();
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({ body: this.state.body })
    }

    render() {
        const { errors } = this.state;
        const { classes, ui: { loading } } = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Post a scream!'><AddIcon/></MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name='body'
                                       type='text'
                                       label='SCREAM!!'
                                       multiline
                                       fullWidth
                                       rows='3'
                                       placeholder='Scream at your fellow apes'
                                       error={errors.body ? true : false}
                                       helperText={errors.body}
                                       className={classes.textField}
                                       onChange={this.handleChange}/>
                            <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
                                Submit
                                { loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                ) }
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}



PostScream.propTypes = {
    classes: PropTypes.object.isRequired,
    postScream: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
    ui: state.ui
})

const mapActionsToProps = {
    postScream,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream))