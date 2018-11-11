import React from 'react';
import {
    Media,
    Grid,
    Col,
    Row,
    Button,
} from 'react-bootstrap';
import Quote from '../Quote';
import { JobStatus, UserTypes } from '../../const';
import pimage from './img/paint-job.png';

const Job = ({
    timestamp,
    client,
    username,
    address,
    details,
    status,
    contractor,
    quote,
    userType,
    onQuote,
    onAccept,
    onFinish,
    onClaim,

}) => {
    let actionBtn = '';
    const contractorRow = contractor ? (
        <Row>
            <Col xs={4} md={3}>
                <b>Contractor:</b>
            </Col>
            <Col xs={14} md={9}>
                {contractor}
            </Col>
        </Row>
    ) : '';
    const quoteRow = status !== JobStatus.CREATED ? (
        <Row>
            <Col xs={4} md={3}>
                <b>Quote:</b>
            </Col>
            <Col xs={14} md={9}>
                {quote}
            </Col>
        </Row>
    ) : '';
    let jobStatusDesc = '';
    switch (status) {
    case JobStatus.CREATED: {
        if (userType === UserTypes.CONTRACTOR) {
            actionBtn = <Quote timestamp={timestamp} client={client} onQuote={onQuote} />;
        }
        jobStatusDesc = 'Waiting Quote';
        break;
    }
    case JobStatus.QUOTED:
        jobStatusDesc = 'Quoted';
        if (userType === UserTypes.CLIENT) {
            actionBtn = <Button bsStyle="primary" onClick={() => onAccept(timestamp, client)}>Accept</Button>;
        }
        break;
    case JobStatus.ACCEPTED:
        jobStatusDesc = 'Quote Accepted';
        if (userType === UserTypes.CONTRACTOR) {
            actionBtn = <Button bsStyle="primary" onClick={() => onFinish(timestamp, client, contractor)}>Finished</Button>;
        }
        break;
    case JobStatus.FINISHED:
        if (userType === UserTypes.CONTRACTOR) {
            actionBtn = <Button bsStyle="primary" onClick={() => onClaim(timestamp, client, contractor)}>Claim</Button>;
        } else {
            actionBtn = <Button bsStyle="danger">Complain</Button>;
        }
        jobStatusDesc = 'Finished';
        break;
    case JobStatus.PAYED:
        jobStatusDesc = 'Payed';
        break;
    default:
        jobStatusDesc = 'Unknown';
    }
    jobStatusDesc = <b>{jobStatusDesc}</b>;
    return (
        <Media>
            <Media.Left>
                <img width={64} height={64} src={pimage} alt="Paint Job" />
            </Media.Left>
            <Media.Body>
                <Media.Heading>Painting job</Media.Heading>
                <p>
                    {details}
                </p>
                <Grid>
                    <Row>
                        <Col xs={4} md={3}>
                            <b>Client Name:</b>
                        </Col>
                        <Col xs={14} md={9}>
                            {username}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} md={3}>
                            <b>Address:</b>
                        </Col>
                        <Col xs={14} md={9}>
                            {address}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} md={3}>
                            <b>Job Status:</b>
                        </Col>
                        <Col xs={14} md={9}>
                            {jobStatusDesc}
                        </Col>
                    </Row>
                    {contractorRow}
                    {quoteRow}
                    <Row>
                        <Col xs={4} md={3}>
                            {actionBtn}
                        </Col>
                        <Col xs={14} md={9} />
                    </Row>
                </Grid>
            </Media.Body>
        </Media>
    );
};

export default Job;
