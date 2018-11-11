import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
    PostJob,
    Header,
    Home,
    MyPostedJobs,
    PostedJobs,
} from '..';

class App extends Component {
    state = {}

    render() {
        return (
            <BrowserRouter>
                <Grid>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/post-job" component={PostJob} />
                        <Route path="/my-posted-jobs" component={MyPostedJobs} />
                        <Route path="/posted-jobs" component={PostedJobs} />
                    </Switch>
                </Grid>
            </BrowserRouter>
        );
    }
}

export default App;
