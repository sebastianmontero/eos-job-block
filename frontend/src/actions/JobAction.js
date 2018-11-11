import { ActionTypes, Accounts } from '../const';
import ApiService from '../services';

class JobAction {
    static getJobsRequest() {
        return {
            type: ActionTypes.GET_JOBS_REQUEST,
        };
    }

    static getJobsSuccess(jobs) {
        return {
            type: ActionTypes.GET_JOBS_SUCCESS,
            jobs,
        };
    }

    static getJobsFailure(error) {
        return {
            type: ActionTypes.GET_JOBS_FAILURE,
            error: error.toString(),
        };
    }

    static getJobs() {
        return (dispatch) => {
            dispatch(JobAction.getJobsRequest());
            ApiService.getJobs()
                .then(
                    (jobs) => {
                        dispatch(JobAction.getJobsSuccess(jobs));
                    },
                    error => dispatch(JobAction.startGameFailure(error)),
                );
        };
    }

    static createJobRequest() {
        return {
            type: ActionTypes.CREATE_JOB_REQUEST,
        };
    }

    static createJobSucces() {
        return {
            type: ActionTypes.CREATE_JOB_SUCCESS,
        };
    }

    static createJobFailure(error) {
        return {
            type: ActionTypes.CREATE_JOB_FAILURE,
            error: error.toString(),
        };
    }

    static createJob(timestamp, username, address, details) {
        return (dispatch) => {
            dispatch(JobAction.createJobRequest());
            ApiService.createJob(
                timestamp,
                Accounts.CLIENT_ACCOUNT,
                username,
                address,
                details,
                Accounts.CLIENT_KEY,
            ).then(
                () => {
                    dispatch(JobAction.createJobSucces());
                    dispatch(JobAction.getJobs());
                },
                error => dispatch(JobAction.createJobFailure(error)),
            );
        };
    }

    static quoteJobRequest() {
        return {
            type: ActionTypes.QUOTE_JOB_REQUEST,
        };
    }

    static quoteJobSuccess() {
        return {
            type: ActionTypes.QUOTE_JOB_SUCCESS,
        };
    }

    static quoteJobFailure(error) {
        return {
            type: ActionTypes.QUOTE_JOB_FAILURE,
            error: error.toString(),
        };
    }

    static quoteJob(timestamp, client, quote) {
        return (dispatch) => {
            dispatch(JobAction.quoteJobRequest());
            ApiService.quoteJob(
                timestamp,
                client,
                Accounts.CONTRACT_ACCOUNT,
                quote,
                Accounts.CONTRACT_KEY,
            ).then(() => {
                dispatch(JobAction.quoteJobSuccess());
                dispatch(JobAction.getJobs());
            },
            error => dispatch(JobAction.quoteJobFailure(error)));
        };
    }

    static acceptJobRequest() {
        return {
            type: ActionTypes.ACCEPT_JOB_REQUEST,
        };
    }

    static acceptJobSuccess() {
        return {
            type: ActionTypes.ACCEPT_JOB_SUCCESS,
        };
    }

    static acceptJobFailure(error) {
        return {
            type: ActionTypes.ACCEPT_JOB_FAILURE,
            error: error.toString(),
        };
    }

    static acceptJob(timestamp, client) {
        return (dispatch) => {
            dispatch(JobAction.acceptJobRequest());
            ApiService.acceptJob(timestamp, client, Accounts.CLIENT_KEY)
                .then(() => {
                    dispatch(JobAction.acceptJobSuccess());
                    dispatch(JobAction.getJobs());
                },
                error => dispatch(JobAction.acceptJobFailure(error)));
        };
    }

    static finishJobRequest() {
        return {
            type: ActionTypes.FINISH_JOB_REQUEST,
        };
    }

    static finishJobSuccess() {
        return {
            type: ActionTypes.FINISH_JOB_SUCCESS,
        };
    }

    static finishJobFailure(error) {
        return {
            type: ActionTypes.FINISH_JOB_FAILURE,
            error: error.toString(),
        };
    }

    static finishJob(timestamp, client) {
        return (dispatch) => {
            dispatch(JobAction.finishJobRequest());
            ApiService.finishJob(timestamp, client, Accounts.CONTRACT_KEY)
                .then(() => {
                    dispatch(JobAction.finishJobSuccess());
                    dispatch(JobAction.getJobs());
                },
                error => dispatch(JobAction.finishJobFailure(error)));
        };
    }

    static claimRequest() {
        return {
            type: ActionTypes.CLAIM_JOB_REQUEST,
        };
    }

    static claimSuccess() {
        return {
            type: ActionTypes.CLAIM_JOB_SUCCESS,
        };
    }

    static claimFailure(error) {
        return {
            type: ActionTypes.CLAIM_JOB_FAILURE,
            error: error.toString(),
        };
    }

    static claim(timestamp, client) {
        return (dispatch) => {
            dispatch(JobAction.claimRequest());
            ApiService.claim(timestamp, client, Accounts.CONTRACT_KEY)
                .then(() => {
                    dispatch(JobAction.claimSuccess());
                    dispatch(JobAction.getJobs());
                },
                error => dispatch(JobAction.claimFailure(error)));
        };
    }
}

export default JobAction;
