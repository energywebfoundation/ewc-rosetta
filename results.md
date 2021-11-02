# Test results

## Mainnet

```shell
rosetta-cli check:construction --configuration-file mainnet.json
```

```
Success: {"create_account":10,"transfer":6}

+--------------------------+--------------------------------+-------+
| CHECK:CONSTRUCTION STATS |          DESCRIPTION           | VALUE |
+--------------------------+--------------------------------+-------+
| Addresses Created        | # of addresses created         |    10 |
+--------------------------+--------------------------------+-------+
| Transactions Created     | # of transactions created      |    24 |
+--------------------------+--------------------------------+-------+
| Stale Broadcasts         | # of broadcasts missing after  |    41 |
|                          | stale depth                    |       |
+--------------------------+--------------------------------+-------+
| Transactions Confirmed   | # of transactions seen         |    24 |
|                          | on-chain                       |       |
+--------------------------+--------------------------------+-------+
| Failed Broadcasts        | # of transactions that         |     0 |
|                          | exceeded broadcast limit       |       |
+--------------------------+--------------------------------+-------+
+------------------------------+-------+
| CHECK:CONSTRUCTION WORKFLOWS | COUNT |
+------------------------------+-------+
| request_funds                |     1 |
+------------------------------+-------+
| create_account               |    10 |
+------------------------------+-------+
| transfer                     |    16 |
+------------------------------+-------+
| return_funds                 |     8 |
+------------------------------+-------+
```

```
rosetta-cli check:data --configuration-file mainnet.json
```

```
+--------------------+--------------------------------+--------+
|  CHECK:DATA TESTS  |          DESCRIPTION           | STATUS |
+--------------------+--------------------------------+--------+
| Request/Response   | Rosetta implementation         | PASSED |
|                    | serviced all requests          |        |
+--------------------+--------------------------------+--------+
| Response Assertion | All responses are correctly    | PASSED |
|                    | formatted                      |        |
+--------------------+--------------------------------+--------+
| Block Syncing      | Blocks are connected into a    | PASSED |
|                    | single canonical chain         |        |
+--------------------+--------------------------------+--------+
| Balance Tracking   | Account balances did not go    | PASSED |
|                    | negative                       |        |
+--------------------+--------------------------------+--------+
| Reconciliation     | No balance discrepencies were  | PASSED |
|                    | found between computed and     |        |
|                    | live balances                  |        |
+--------------------+--------------------------------+--------+

+--------------------------+--------------------------------+------------+
|     CHECK:DATA STATS     |          DESCRIPTION           |   VALUE    |
+--------------------------+--------------------------------+------------+
| Blocks                   | # of blocks synced             |       1001 |
+--------------------------+--------------------------------+------------+
| Orphans                  | # of blocks orphaned           |          0 |
+--------------------------+--------------------------------+------------+
| Transactions             | # of transaction processed     |       5099 |
+--------------------------+--------------------------------+------------+
| Operations               | # of operations processed      |      12294 |
+--------------------------+--------------------------------+------------+
| Accounts                 | # of accounts seen             |        966 |
+--------------------------+--------------------------------+------------+
| Active Reconciliations   | # of reconciliations performed |       6236 |
|                          | after seeing an account in a   |            |
|                          | block                          |            |
+--------------------------+--------------------------------+------------+
| Inactive Reconciliations | # of reconciliations performed |        489 |
|                          | on randomly selected accounts  |            |
+--------------------------+--------------------------------+------------+
| Exempt Reconciliations   | # of reconciliation failures   |          0 |
|                          | considered exempt              |            |
+--------------------------+--------------------------------+------------+
| Failed Reconciliations   | # of reconciliation failures   |          0 |
+--------------------------+--------------------------------+------------+
| Skipped Reconciliations  | # of reconciliations skipped   |          0 |
+--------------------------+--------------------------------+------------+
| Reconciliation Coverage  | % of accounts that have been   | 57.867495% |
|                          | reconciled                     |            |
+--------------------------+--------------------------------+------------+

```
