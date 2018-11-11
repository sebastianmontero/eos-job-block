import { Api, JsonRpc, JsSignatureProvider } from 'eosjs';

async function takeAction(action, dataValue, account, key) {
    const rpc = new JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
    const signatureProvider = new JsSignatureProvider([key]);

    const api = new Api({
        rpc,
        signatureProvider,
        textEncoder: new TextEncoder(),
        textDecoder: new TextDecoder(),
    });

    try {
        const resultWithConfig = await api.transact({
            actions: [{
                account: process.env.REACT_APP_EOS_CONTRACT_NAME,
                name: action,
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],
                data: dataValue,
            }],
        },
        {
            blocksBehind: 3,
            expireSeconds: 30,
        });

        return resultWithConfig;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

class ApiService {
    static async createJob(timestamp, client, username, address, details, clientKey) {
        return takeAction('createjob', {
            client,
            timestamp,
            username,
            address,
            details,
        }, client, clientKey);
    }

    static async quoteJob(timestamp, client, contractor, quote, contractorKey) {
        return takeAction('quoteJob', {
            client,
            timestamp,
            contractor,
            quote,
        }, client, contractorKey);
    }

    static async acceptJob(timestamp, client, clientKey) {
        return takeAction('acceptJob', {
            client,
            timestamp,
        }, client, clientKey);
    }

    static async finishJob(timestamp, client, contractorKey) {
        return takeAction('finishjob', {
            client,
            timestamp,
        }, client, contractorKey);
    }

    static async claim(timestamp, client, contractorKey) {
        return takeAction('claim', {
            client,
            timestamp,
        }, client, contractorKey);
    }

    static async getJobs() {
        try {
            const rpc = new JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
            const result = await rpc.get_table_rows({
                code: process.env.REACT_APP_EOS_CONTRACT_NAME,
                scope: process.env.REACT_APP_EOS_CONTRACT_NAME,
                json: true,
                table: 'jobstruct',
            });
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ApiService;
