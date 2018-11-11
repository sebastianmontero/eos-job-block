import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
    PostJob,
    Header,
    Home,
    PostedJobs,
    Jobs,
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
                        <Route path="/posted-jobs" component={PostedJobs} />
                        <Route path="/jobs" component={Jobs} />
                    </Switch>
                </Grid>
            </BrowserRouter>
        );
    }
}

export default App;
