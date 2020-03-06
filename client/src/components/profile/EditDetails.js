import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';


// MUI
import { Button, Tooltip, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

//Icon
import EditIcon from '@material-ui/icons/Edit';

// Redux
import { editUserDetails } from '../../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.button,
    ...theme.textField,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                {/* <Tooltip title='Edit details' placement='top'>
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color='primary'/>
                    </IconButton>
                </Tooltip> */}
                <MyButton tip='Edit details' onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color='primary'/>
                </MyButton>
                <Dialog open={this.state.open} 
                        onClose={this.handleClose}
                        fullWidth
                        maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name='bio' 
                                       type='text' 
                                       label='Bio' 
                                       multiline 
                                       fullWidth 
                                       rows='3' 
                                       placeholder='A short bio about yourself' 
                                       className={classes.textField} 
                                       value={this.state.bio} 
                                       onChange={this.handleChange}/>
                            <TextField name='website' 
                                       type='text' 
                                       label='Website' 
                                       fullWidth  
                                       placeholder='Your personal/professional website' 
                                       className={classes.textField} 
                                       value={this.state.website} 
                                       onChange={this.handleChange}/>
                            <TextField name='location' 
                                       type='text' 
                                       label='Location' 
                                       fullWidth
                                       placeholder='Where you live' 
                                       className={classes.textField} 
                                       value={this.state.location} 
                                       onChange={this.handleChange}/>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                        <Button onClick={this.handleSubmit} color='primary'>Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}


EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

const mapActionsToProps = {
    editUserDetails
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));