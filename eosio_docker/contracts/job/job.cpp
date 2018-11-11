#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>

using namespace eosio;
using namespace std;

// Smart Contract Name: notechain
// Table struct:
//   notestruct: multi index table to store the notes
//     prim_key(uint64): primary key
//     user(name): account name for the user
//     note(string): the note message
//     timestamp(uint64): the store the last update block time
// Public method:
//   isnewuser => to check if the given account name has note in table or not
// Public actions:
//   update => put the note into the multi-index table and sign by the given account

// Replace the contract class name when you start your own project
CONTRACT job : public eosio::contract
{
  private:
    enum job_status : int8_t
    {
        CREATED = 0,
        QUOTED = 1,
        ACCEPTED = 2,
        FINISHED = 3,
        PAYED = 4,
        DISPUTE = 5
    };

    TABLE jobstruct
    {
        uint64_t prim_key; // primary key
        uint128_t skey;
        string username;
        name client;     // account name for the client
        name contractor; // account name for the user
        string address;  // the job message
        string details;  // the job message
        string complain; // the job message
        int8_t status;
        asset quote;
        // primary key
        auto primary_key() const { return prim_key; }
        uint128_t get_by_skey() const { return skey; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index<name("jobstruct"), jobstruct, indexed_by<name("getbyskey"), const_mem_fun<jobstruct, uint128_t, &jobstruct::get_by_skey>>> job_table;

    job_table _jobs;

    uint128_t getskey(const uint64_t timestamp, name client)
    {
        return static_cast<uint128_t>(client.value) << 64 | timestamp;
    }

  public:
    using contract::contract;

    // constructor
    job(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds),
                                                                 _jobs(receiver, receiver.value) {}

    ACTION createjob(const uint64_t timestamp, name client, string &username, string &address, string &details)
    {

        uint128_t skey = getskey(timestamp, client);
        // to sign the action with the given account
        require_auth(client);
        _jobs.emplace(_self, [&](auto &new_job) {
            new_job.prim_key = _jobs.available_primary_key();
            new_job.skey = skey;
            new_job.username = username;
            new_job.client = client;
            new_job.address = address;
            new_job.details = details;
            new_job.status = CREATED;
        });
    }

    ACTION quotejob(const uint64_t timestamp, name client, name contractor, asset quote)
    {

        uint128_t skey = getskey(timestamp, client);
        // to sign the action with the given account
        require_auth(contractor);

        auto job_index = _jobs.get_index<name("getbyskey")>();
        auto &job = job_index.get(skey, "Job not found");
        eosio_assert(job.status == CREATED, "Job not in created state");

        _jobs.modify(job, _self, [&](auto &modified_job) {
            modified_job.contractor = contractor;
            modified_job.quote = quote;
            modified_job.status = QUOTED;
        });
    }

    ACTION acceptjob(const uint64_t timestamp, name client)
    {

        uint128_t skey = getskey(timestamp, client);
        // to sign the action with the given account

        auto job_index = _jobs.get_index<name("getbyskey")>();
        auto &job = job_index.get(skey, "Job not found");
        require_auth(job.client);
        eosio_assert(job.status == QUOTED, "Job not in quoted state");

        _jobs.modify(job, _self, [&](auto &modified_job) {
            modified_job.status = ACCEPTED;
        });

        action(
            permission_level{client, name("active")},
            name("token"),
            name("transfer"),
            std::make_tuple(client, _self, job.quote, "To perform job with id: "))
            .send();
    }

    ACTION finishjob(const uint64_t timestamp, name client)
    {

        uint128_t skey = getskey(timestamp, client);
        // to sign the action with the given account

        auto job_index = _jobs.get_index<name("getbyskey")>();
        auto &job = job_index.get(skey, "Job not found");
        require_auth(job.contractor);
        eosio_assert(job.status == ACCEPTED, "Job not in accepted state");

        _jobs.modify(job, _self, [&](auto &modified_job) {
            modified_job.status = FINISHED;
        });
    }

    ACTION claim(const uint64_t timestamp, name client)
    {

        uint128_t skey = getskey(timestamp, client);
        // to sign the action with the given account

        auto job_index = _jobs.get_index<name("getbyskey")>();
        auto &job = job_index.get(skey, "Job not found");
        require_auth(job.contractor);
        eosio_assert(job.status == FINISHED, "The job is not in finished state");

        _jobs.modify(job, _self, [&](auto &modified_job) {
            modified_job.status = PAYED;
        });

        action(
            permission_level{_self, name("active")},
            name("token"),
            name("transfer"),
            std::make_tuple(_self, job.contractor, job.quote, "To perform job with id: "))
            .send();
    }
};

// specify the contract name, and export a public action: update
EOSIO_DISPATCH(job, (createjob)(quotejob)(acceptjob)(finishjob)(claim))