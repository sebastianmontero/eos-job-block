import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { JobAction } from '../../actions';

class PostJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Pedro Fernandez',
            address: 'address',
            details: 'details',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, address, details } = this.state;
        const timestamp = Math.floor(Date.now() / 1000);
        const { onCreateJob } = this.props;
        onCreateJob(timestamp, username, address, details);
    }

    render() {
        return (
            <Button bsStyle="primary" onClick={this.handleSubmit}>Post Job</Button>
        );
    }
}

const mapStateToProps = ({ job: { status } }) => ({
    status,
});


const mapDispatchToProps = dispatch => ({
    onCreateJob: (timestamp, username, address, details) => dispatch((_, getState) => {
        dispatch(JobAction.createJob(timestamp, username, address, details));
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostJob);
