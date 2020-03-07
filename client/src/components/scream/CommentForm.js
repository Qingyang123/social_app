import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import { Button, Grid, TextField } from '@material-ui/core';

// Reudx
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';


const styles = (theme) => ({
    ...theme.textField,
    button: {
        marginTop: 20,
        position: 'relative'
    }
})

class CommentForm extends Component {

    state = {
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({ body: '' });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.body });
    }

    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField name='body' 
                               type='text' 
                               label='Comment on scream' 
                               error={errors.comment ? true : false}
                               helperText={errors.comment}
                               value={this.state.body}
                               onChange={this.handleChange}
                               fullWidth
                               className={classes.textField}/>
                    <Button type='submit' variant='contained' color='primary' className={classes.button}>Submit</Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        ) : null;

        return commentFormMarkup;
    }
}


CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    submitComment: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    screamId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    ui: state.ui,
    authenticated: state.user.authenticated
});

const mapActionsToProps = {
    submitComment
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));