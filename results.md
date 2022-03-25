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
| Transactions Created     | # of transactions created      |    23 |
+--------------------------+--------------------------------+-------+
| Stale Broadcasts         | # of broadcasts missing after  |    10 |
|                          | stale depth                    |       |
+--------------------------+--------------------------------+-------+
| Transactions Confirmed   | # of transactions seen         |    23 |
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
| create_account               |    10 |
+------------------------------+-------+
| transfer                     |    16 |
+------------------------------+-------+
| return_funds                 |     7 |
+------------------------------+-------+

```

```
rosetta-cli check:data --configuration-file mainnet.json
```

```
2022/03/23 15:57:55 Syncing 0-17017172
...

Success: Reconciliation Coverage End Condition [Coverage: 100.000000%]

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

+--------------------------+--------------------------------+-----------+
|     CHECK:DATA STATS     |          DESCRIPTION           |   VALUE   |
+--------------------------+--------------------------------+-----------+
| Blocks                   | # of blocks synced             |         1 |
+--------------------------+--------------------------------+-----------+
| Orphans                  | # of blocks orphaned           |         0 |
+--------------------------+--------------------------------+-----------+
| Transactions             | # of transaction processed     |         1 |
+--------------------------+--------------------------------+-----------+
| Operations               | # of operations processed      |         4 |
+--------------------------+--------------------------------+-----------+
| Accounts                 | # of accounts seen             |         2 |
+--------------------------+--------------------------------+-----------+
| Active Reconciliations   | # of reconciliations performed |         2 |
|                          | after seeing an account in a   |           |
|                          | block                          |           |
+--------------------------+--------------------------------+-----------+
| Inactive Reconciliations | # of reconciliations performed |         0 |
|                          | on randomly selected accounts  |           |
+--------------------------+--------------------------------+-----------+
| Exempt Reconciliations   | # of reconciliation failures   |         0 |
|                          | considered exempt              |           |
+--------------------------+--------------------------------+-----------+
| Failed Reconciliations   | # of reconciliation failures   |         0 |
+--------------------------+--------------------------------+-----------+
| Skipped Reconciliations  | # of reconciliations skipped   |         0 |
+--------------------------+--------------------------------+-----------+
| Reconciliation Coverage  | % of accounts that have been   | 0.000000% |
|                          | reconciled                     |           |
+--------------------------+--------------------------------+-----------+


```
