import React, { Component } from 'react';
import axios from 'axios';

import Scream from '../components/Scream';

// MUI
import Grid from '@material-ui/core/Grid';

class Home extends Component {

    state = {
        screams: null
    }

    componentDidMount() {
        axios.get('/screams')
            .then(res => {
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        console.log(typeof(this.state.screams));
        console.log(this.state.screams)
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream scream={scream} key={scream.screamId}/>)
        ) : <p>Loading ...</p>
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    { recentScreamsMarkup }
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile ...</p>
                </Grid>
            </Grid>
        )
    }
}

export default Home;