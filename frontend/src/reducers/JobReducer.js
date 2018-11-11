import { ActionTypes, AppStates } from '../const';

const initialState = {
    jobs: [],
    error: '',
    status: AppStates.AWAITING,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.GET_JOBS_REQUEST:
        return {
            jobs: [],
            error: '',
            status: AppStates.LOADING,
        };
    case ActionTypes.GET_JOBS_SUCCESS:
        return {
            jobs: action.jobs,
            error: '',
            status: AppStates.AWAITING,
        };
    case ActionTypes.GET_JOBS_FAILURE:
        return {
            ...state,
            error: action.error,
            status: AppStates.AWAITING,
        };
    case ActionTypes.CREATE_JOB_REQUEST:
        return {
            ...state,
            status: AppStates.CREATING_JOB,
            error: '',

        };
    case ActionTypes.CREATE_JOB_SUCCESS:
        return {
            ...state,
            status: AppStates.CREATED_JOB,
        };
    case ActionTypes.CREATE_JOB_FAILURE:
        return {
            ...state,
            status: AppStates.AWAITING,
            error: action.error,
        };
    case ActionTypes.QUOTE_JOB_REQUEST:
        return {
            ...state,
            status: AppStates.LOADING,
            error: '',
        };
    case ActionTypes.QUOTE_JOB_SUCCESS:
        return {
            ...state,
            status: AppStates.AWAITING,
        };
    case ActionTypes.QUOTE_JOB_FAILURE:
        return {
            ...state,
            status: AppStates.AWAITING,
            error: action.error,
        };
    case ActionTypes.ACCEPT_JOB_REQUEST:
        return {
            ...state,
            status: AppStates.LOADING,
            error: '',
        };
    case ActionTypes.ACCEPT_JOB_SUCCESS:
        return {
            ...state,
            status: AppStates.AWAITING,
        };
    case ActionTypes.ACCEPT_JOB_FAILURE:
        return {
            ...state,
            status: AppStates.AWAITING,
            error: action.error,
        };
    case ActionTypes.FINISH_JOB_REQUEST:
        return {
            ...state,
            status: AppStates.LOADING,
            error: '',
        };
    case ActionTypes.FINISH_JOB_SUCCESS:
        return {
            ...state,
            status: AppStates.AWAITING,
        };
    case ActionTypes.FINISH_JOB_FAILURE:
        return {
            ...state,
            status: AppStates.AWAITING,
            error: action.error,
        };
    case ActionTypes.CLAIM_REQUEST:
        return {
            ...state,
            status: AppStates.LOADING,
            error: '',
        };
    case ActionTypes.CLAIM_SUCCESS:
        return {
            ...state,
            status: AppStates.AWAITING,
        };
    case ActionTypes.CLAIM_FAILURE:
        return {
            ...state,
            status: AppStates.AWAITING,
            error: action.error,
        };
    default:
        return state;
    }
};
