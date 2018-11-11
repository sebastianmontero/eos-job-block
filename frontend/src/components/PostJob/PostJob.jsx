import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    FormGroup, FormControl, ControlLabel, Button, Modal,
} from 'react-bootstrap';
import { JobAction } from '../../actions';
import { AppStates } from '../../const';

class PostJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'Pedro Fernandez',
            address: 'address',
            details: 'details',
            show: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({
            show: false,
        });
        const { history } = this.props;
        history.push('/my-posted-jobs');
    }

    handleShow() {
        this.setState({
            show: true,
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        const { username, address, details } = this.state;
        const timestamp = Math.floor(Date.now() / 1000);
        const { onCreateJob } = this.props;
        onCreateJob(timestamp, username, address, details);
    }

    render() {
        const { status } = this.props;
        const {
            username,
            address,
            details,
            show,
        } = this.state;

        console.log('show: ', show);
        return (
            <div>
                <Modal show={show || status === AppStates.CREATED_JOB} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Job Posted!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Job was posted successfully!</Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.handleClose}>Accept</Button>
                    </Modal.Footer>
                </Modal>
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
            </div>
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
