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
| Addresses Created        | # of addresses created         |    11 |
+--------------------------+--------------------------------+-------+
| Transactions Created     | # of transactions created      |    16 |
+--------------------------+--------------------------------+-------+
| Stale Broadcasts         | # of broadcasts missing after  |    13 |
|                          | stale depth                    |       |
+--------------------------+--------------------------------+-------+
| Transactions Confirmed   | # of transactions seen         |    16 |
|                          | on-chain                       |       |
+--------------------------+--------------------------------+-------+
| Failed Broadcasts        | # of transactions that         |     0 |
|                          | exceeded broadcast limit       |       |
+--------------------------+--------------------------------+-------+
+------------------------------+-------+
| CHECK:CONSTRUCTION WORKFLOWS | COUNT |
+------------------------------+-------+
| request_funds                |     0 |
+------------------------------+-------+
| create_account               |    11 |
+------------------------------+-------+
| transfer                     |     9 |
+------------------------------+-------+
| return_funds                 |     7 |
+------------------------------+-------+

```

```shell
rosetta-cli check:data --configuration-file mainnet.json
```

```
Success: Index End Condition [Index: 18100000]

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
| Blocks                   | # of blocks synced             |   18100001 |
+--------------------------+--------------------------------+------------+
| Orphans                  | # of blocks orphaned           |          0 |
+--------------------------+--------------------------------+------------+
| Transactions             | # of transaction processed     |   59088814 |
+--------------------------+--------------------------------+------------+
| Operations               | # of operations processed      |  161541872 |
+--------------------------+--------------------------------+------------+
| Accounts                 | # of accounts seen             |      62903 |
+--------------------------+--------------------------------+------------+
| Active Reconciliations   | # of reconciliations performed |   31356193 |
|                          | after seeing an account in a   |            |
|                          | block                          |            |
+--------------------------+--------------------------------+------------+
| Inactive Reconciliations | # of reconciliations performed |   42867150 |
|                          | on randomly selected accounts  |            |
+--------------------------+--------------------------------+------------+
| Exempt Reconciliations   | # of reconciliation failures   |          0 |
|                          | considered exempt              |            |
+--------------------------+--------------------------------+------------+
| Failed Reconciliations   | # of reconciliation failures   |          0 |
+--------------------------+--------------------------------+------------+
| Skipped Reconciliations  | # of reconciliations skipped   |   37319413 |
+--------------------------+--------------------------------+------------+
| Reconciliation Coverage  | % of accounts that have been   | 99.960256% |
|                          | reconciled                     |            |
+--------------------------+--------------------------------+------------+

```
## TESTNET

```shell
rosetta-cli check:construction --configuration-file volta.json
```

fund return complete!

Success: {"create_account":10,"transfer":6}

+--------------------------+--------------------------------+-------+
| CHECK:CONSTRUCTION STATS |          DESCRIPTION           | VALUE |
+--------------------------+--------------------------------+-------+
| Addresses Created        | # of addresses created         |    16 |
+--------------------------+--------------------------------+-------+
| Transactions Created     | # of transactions created      |    21 |
+--------------------------+--------------------------------+-------+
| Stale Broadcasts         | # of broadcasts missing after  |    12 |
|                          | stale depth                    |       |
+--------------------------+--------------------------------+-------+
| Transactions Confirmed   | # of transactions seen         |    21 |
|                          | on-chain                       |       |
+--------------------------+--------------------------------+-------+
| Failed Broadcasts        | # of transactions that         |     0 |
|                          | exceeded broadcast limit       |       |
+--------------------------+--------------------------------+-------+
+------------------------------+-------+

```shell
rosetta-cli check:data --configuration-file volta.json
```

Success: Index End Condition [Index: 18000000]

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
| Reconciliation     | No balance discrepancies were  | PASSED |
|                    | found between computed and     |        |
|                    | live balances                  |        |
+--------------------+--------------------------------+--------+

+--------------------------+--------------------------------+------------+
|     CHECK:DATA STATS     |          DESCRIPTION           |   VALUE    |
+--------------------------+--------------------------------+------------+
| Blocks                   | # of blocks synced             |   18000001 |
+--------------------------+--------------------------------+------------+
| Orphans                  | # of blocks orphaned           |          0 |
+--------------------------+--------------------------------+------------+
| Transactions             | # of transaction processed     |  177987422 |
+--------------------------+--------------------------------+------------+
| Operations               | # of operations processed      |  424534742 |
+--------------------------+--------------------------------+------------+
| Accounts                 | # of accounts seen             |    2277000 |
+--------------------------+--------------------------------+------------+
| Active Reconciliations   | # of reconciliations performed |   90801392 |
|                          | after seeing an account in a   |            |
|                          | block                          |            |
+--------------------------+--------------------------------+------------+
| Inactive Reconciliations | # of reconciliations performed |   86427315 |
|                          | on randomly selected accounts  |            |
+--------------------------+--------------------------------+------------+
| Exempt Reconciliations   | # of reconciliation failures   |          0 |
|                          | considered exempt              |            |
+--------------------------+--------------------------------+------------+
| Failed Reconciliations   | # of reconciliation failures   |          0 |
+--------------------------+--------------------------------+------------+
| Skipped Reconciliations  | # of reconciliations skipped   |   41715964 |
+--------------------------+--------------------------------+------------+
| Reconciliation Coverage  | % of accounts that have been   | 99.900834% |
|                          | reconciled                     |            |
+--------------------------+--------------------------------+------------+
