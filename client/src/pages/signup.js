import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Reudx
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

// UI
import AppIcon from '../images/icon.png';
import { TextField, Grid, Typography, Button, CircularProgress } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.pages
})

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
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
        this.setState({
            loading: true
        })
        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        this.props.signupUser(userData, this.props.history);
        // axios.post('/signup', userData)
        //     .then(res => {
        //         console.log(res.data);
        //         localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        //         this.setState({
        //             loading: false
        //         });
        //         this.props.history.push('/');
        //     })
        //     .catch(err => {
        //         this.setState({
        //             errors: err.response.data,
        //             loading: false
        //         })
        //     })
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
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" helperText={errors.email} error={errors.email ? true : false}
                                   className={classes.textField}
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   fullWidth />
                        
                        <TextField id="password" name="password" type="password" label="Password" helperText={errors.password} error={errors.password ? true : false}
                                   className={classes.textField}
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   fullWidth />
                        <TextField id="confirmPassword" name="confirmPassword" type="confirmPassword" label="Confirm Password" helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false}
                                   className={classes.textField}
                                   value={this.state.confirmPassword}
                                   onChange={this.handleChange}
                                   fullWidth />
                        <TextField id="handle" name="handle" type="handle" label="Handle" helperText={errors.handle} error={errors.handle ? true : false}
                                   className={classes.textField}
                                   value={this.state.handle}
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
                            Signup
                            {
                                loading && (
                                    <CircularProgress size={30} className={classes.progress}/>
                                )
                            }
                        </Button>
                        <br/>
                        <small>Already have an account? Log in <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));