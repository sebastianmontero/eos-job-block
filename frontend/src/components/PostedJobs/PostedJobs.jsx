import React from 'react';
import Jobs from '../Jobs';
import { UserTypes } from '../../const';

const PostedJobs = () => (
    <Jobs userType={UserTypes.CONTRACTOR} />
);

export default PostedJobs;
