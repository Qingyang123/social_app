import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Reudx
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

// UI
import AppIcon from '../images/icon.png';
import { TextField, Grid, Typography, Button, CircularProgress } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.pages
})


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({
                errors: nextProps.ui.errors
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes, ui: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email"
                                   helperText={errors.email}
                                   error={errors.email ? true : false}
                                   className={classes.textField}
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   fullWidth />
                        
                        <TextField id="password" name="password" type="password" label="Password"
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                   className={classes.textField}
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   fullWidth />
                        
                        {
                            errors.general && ( 
                                <Typography variant='body2' className={classes.customError}>
                                    { errors.general }
                                </Typography> 
                            )
                        }
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Login
                            {
                                loading && (
                                    <CircularProgress size={30} className={classes.progress}/>
                                )
                            }
                        </Button>
                        <br/>
                        <small>Dont have an account? Sign up <Link to="/signup">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));