import React from 'react';
import Jobs from '../Jobs';
import { UserTypes } from '../../const';

const MyPostedJobs = () => (
    <Jobs userType={UserTypes.CLIENT} />
);

export default MyPostedJobs;
