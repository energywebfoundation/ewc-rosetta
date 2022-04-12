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
| Block Syncing      | Blocks are connected into a    | FAILED |
|                    | single canonical chain         |        |
+--------------------+--------------------------------+--------+
| Balance Tracking   | Account balances did not go    | PASSED |
|                    | negative                       |        |
+--------------------+--------------------------------+--------+
| Reconciliation     | No balance discrepencies were  | FAILED |
|                    | found between computed and     |        |
|                    | live balances                  |        |
+--------------------+--------------------------------+--------+

+--------------------------+--------------------------------+------------+
|     CHECK:DATA STATS     |          DESCRIPTION           |   VALUE    |
+--------------------------+--------------------------------+------------+
| Blocks                   | # of blocks synced             |    1319370 |
+--------------------------+--------------------------------+------------+
| Orphans                  | # of blocks orphaned           |          0 |
+--------------------------+--------------------------------+------------+
| Transactions             | # of transaction processed     |    1481481 |
+--------------------------+--------------------------------+------------+
| Operations               | # of operations processed      |    5601942 |
+--------------------------+--------------------------------+------------+
| Accounts                 | # of accounts seen             |         84 |
+--------------------------+--------------------------------+------------+
| Active Reconciliations   | # of reconciliations performed |    2467873 |
|                          | after seeing an account in a   |            |
|                          | block                          |            |
+--------------------------+--------------------------------+------------+
| Inactive Reconciliations | # of reconciliations performed |     214345 |
|                          | on randomly selected accounts  |            |
+--------------------------+--------------------------------+------------+
| Exempt Reconciliations   | # of reconciliation failures   |          0 |
|                          | considered exempt              |            |
+--------------------------+--------------------------------+------------+
| Failed Reconciliations   | # of reconciliation failures   |     119460 |
+--------------------------+--------------------------------+------------+
| Skipped Reconciliations  | # of reconciliations skipped   |      30100 |
+--------------------------+--------------------------------+------------+
| Reconciliation Coverage  | % of accounts that have been   | 96.428571% |
|                          | reconciled                     |            |
+--------------------------+--------------------------------+------------+

Command Failed: unable to process blocks: unable to process block: negative balance -24458538117485714352490:&{Symbol:EWT Decimals:18 Metadata:map[]} for &{Address:0xD65b4C25A4CE1E024fF13425Df1E0E574a1a0e9B SubAccount:<nil> Metadata:map[]} at &{Index:1319371 Hash:0xc721bc1fbee63ea378f8437727a8cf5db333ab432784fa4192e4533966b5709d}: unable to add block to storage 0xc721bc1fbee63ea378f8437727a8cf5db333ab432784fa4192e4533966b5709d:1319371: unable to sync to 17000000

```
## TESTNET

### Volta check construction
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
```
