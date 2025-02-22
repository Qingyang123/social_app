import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// MUI
import { Grid, Typography } from '@material-ui/core';


const styles = theme => ({
    ...theme.invisibleSeparator,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
})

class Comments extends Component {
    render() {
        const { classes, comments } = this.props;
        return (
            <Grid container>
                {
                    comments && comments.map((comment, index) => {
                        const { body, createdAt, userImage, userHandle } = comment;
                        return (
                            <Fragment key={createdAt}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={2}><img src={userImage} alt='comment' className={classes.commentImage}/></Grid>
                                        <Grid item sm={9}>
                                            <div className={classes.commentData}>
                                                <Typography variant='h5' component={Link} to={`/users/${userHandle}`} color='primary'>
                                                    {userHandle}
                                                </Typography>
                                                <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</Typography>
                                                <hr className={classes.invisibleSeparator}/>
                                                <Typography variant='body1'>{body}</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {
                                    index !== comments.length - 1 ? <hr className={classes.invisibleSeparator}/> : null
                                }
                            </Fragment>
                        );
                    })
                }
            </Grid>
        );
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired
};


export default withStyles(styles)(Comments)