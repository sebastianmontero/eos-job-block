import React from 'react';
import Job from '../Job';

const JobList = ({
    jobs,
    userType,
    onQuote,
    onAccept,
    onFinish,
    onClaim,
}) => jobs.map((job, idx) => {
    const {
        timestamp,
        client,
        username,
        address,
        details,
        status,
        contractor,
        quote,
    } = job;
    return (
        <Job
            key={idx}
            timestamp={timestamp}
            client={client}
            username={username}
            address={address}
            details={details}
            status={status}
            contractor={contractor}
            quote={quote}
            userType={userType}
            onQuote={onQuote}
            onAccept={onAccept}
            onFinish={onFinish}
            onClaim={onClaim}
        />
    );
});

JobList.displayName = 'JobList';

export default JobList;
