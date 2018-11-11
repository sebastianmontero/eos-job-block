import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    FormGroup, FormControl, ControlLabel, Button,
} from 'react-bootstrap';
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
        const { username, address, details } = this.state;
        return (

            <form>
                <FormGroup controlId="nameText">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        type="text"
                        value={username}
                        readOnly
                    />
                </FormGroup>
                <FormGroup controlId="addressText">
                    <ControlLabel>Address</ControlLabel>
                    <FormControl
                        type="text"
                        value={address}
                        readOnly
                    />
                </FormGroup>
                <FormGroup controlId="detailsText">
                    <ControlLabel>Details</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        value={details}
                        readOnly
                    />
                </FormGroup>
                <Button bsStyle="primary" onClick={this.handleSubmit}>Post Job</Button>
            </form>
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
