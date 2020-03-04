import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI
import { Button, Paper, Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link'

// ICON
import { LocationOn, CalendarToday } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';

// const styles = (theme) => ({
//     ...theme.paper,
//     ...theme.profile,
//     ...theme.buttons
// })

const styles = {
    paper: {
        padding: 20,
        marginLeft: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            width: 200,
            height: 200,
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00bcd4'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
}
class Profile extends Component {
    render() {
        const { 
            classes, 
            user: { 
                credentials: { handle, createdAt, imageUrl, bio, website, location }, 
                loading,
                authenticated
            } 
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={imageUrl} alt='profile' className='profile-image'/>
                    </div>
                    <hr/>
                    <div className='profile-details'>
                        <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
                            @{handle}
                        </MuiLink>
                        <hr/>
                        { bio && <Typography variant='body2'>{ bio }</Typography> }
                        <hr/>
                        { location && (
                            <Fragment>
                                <LocationOn color='primary'/> <span>{ location }</span>
                                <hr/>
                            </Fragment>
                        ) }
                        { website && (
                            <Fragment>
                                <LinkIcon/>
                                <a href={website} target="_blank" rel='noopener noerferrer'>
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        ) }
                        <CalendarToday color='primary'/>{' '}
                        <span>Joined { dayjs(createdAt).format('MM YYYY') }</span>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>
                    No profile found, please login again
                    <div className={classes.buttons}>
                        <Button variant='contained' color='primary' component={Link} to='/login'>Login</Button>
                        <Button variant='contained' color='secondary' component={Link} to='/signup'>Signup</Button>
                    </div>
                </Typography>
            </Paper>
        )) : (<p>loading ...</p>)
        return profileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Profile));