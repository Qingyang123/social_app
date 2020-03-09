import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// MUI
import { Paper, Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link'

// Icon
import { LocationOn, CalendarToday } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';


const styles = theme => ({
    paper: theme.paper,
    profile: theme.profile
})

const StaticProfile = (props) => {
    const {
        classes,
        profile: { handle, createdAt, imageUrl, bio, website, location }
    } = props;

    return (
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
    );
}
    
StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);