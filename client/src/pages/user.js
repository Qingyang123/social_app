import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile.js';
import ScreamSkeleton from '../util/ScreamSkeleton.js';
import ProfileSkeleton from '../util/ProfileSkeleton';

// MUI
import { Grid } from '@material-ui/core';

// Reudx
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class User extends Component {

    state = {
        profile: null,
        screamIdParam: null
    }

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if (screamId) {
            this.setState({
                screamIdParam: screamId
            })
        }

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        const { screams, loading } = this.props.data;
        const { screamIdParam } = this.state;

        const screamsMarkup = loading ? (
            <ScreamSkeleton/>
        ) : screams === null ? (
            <p>No screams from this user</p>
        ) : !screamIdParam ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
        ) : (
            screams.map(scream => {
                if (scream.screamId !== screamIdParam) {
                    return <Scream key={scream.screamId} scream={scream}/>
                } else {
                    return <Scream key={scream.screamId} scream={scream} openDialog/>
                }
            })
        )

        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    { screamsMarkup }
                </Grid>
                <Grid item sm={4} xs={12}>
                    {
                        this.state.profile === null ? (
                            <ProfileSkeleton/>
                        ) : (
                            <StaticProfile profile={this.state.profile}/>
                        )
                    }
                </Grid>
            </Grid>
        );
    }
}

User.propTypes = {
    data: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionsToProps = {
    getUserData
}


export default connect(mapStateToProps, mapActionsToProps)(User);