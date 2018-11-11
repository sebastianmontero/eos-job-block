import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobList from '../JobList';
import { JobAction } from '../../actions';

class Jobs extends Component {
    componentDidMount() {
        const { onMount } = this.props;
        onMount();
    }

    render() {
        const {
            jobs,
            userType,
            onQuote,
            onAccept,
            onFinish,
            onClaim,
        } = this.props;
        return (
            <div>
                <JobList jobs={jobs} userType={userType} onQuote={onQuote} onAccept={onAccept} onFinish={onFinish} onClaim={onClaim} />
            </div>
        );
    }
}

const mapStateToProps = ({ job: { jobs } }) => ({
    jobs,
});


const mapDispatchToProps = dispatch => ({
    onMount: () => dispatch((_, getState) => {
        dispatch(JobAction.getJobs());
    }),
    onQuote: (timestamp, client, quote) => dispatch((_, getState) => {
        dispatch(JobAction.quoteJob(timestamp, client, quote));
    }),
    onAccept: (timestamp, client, contractor) => dispatch((_, getState) => {
        dispatch(JobAction.acceptJob(timestamp, client, contractor));
    }),
    onFinish: (timestamp, client, contractor) => dispatch((_, getState) => {
        dispatch(JobAction.finishJob(timestamp, client, contractor));
    }),
    onClaim: (timestamp, client, contractor) => dispatch((_, getState) => {
        dispatch(JobAction.claim(timestamp, client, contractor));
    }),
    /* onCreateJob: (timestamp, username, address, details) => dispatch((_, getState) => {
        dispatch(JobAction.createJob(timestamp, username, address, details));
    }), */
});

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
