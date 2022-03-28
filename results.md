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
-> Pending


```
