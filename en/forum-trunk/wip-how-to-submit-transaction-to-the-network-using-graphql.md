1. Open web browser (e.g.,Google Chrome) and go to the playground of miner
miner address: http://a53d8b9e8f9604e088da646d930fcb8d-956876586.us-east-2.elb.amazonaws.com/ui/playground

2. Paste mutation and run
  ```graphql
  mutation
  {
    stageTransaction(payload: "")
  }
  ```
- `payload` must be encoded as hex-decimal. (we'll need to write about how to create tx on this post or another one).

3. Check the progress using below query
```graphql
query{
  nodeStatus
  {
    # Are txs still in the stage?
    stagedTxIds(address: "")
  }
  transaction
  {
    # Check tx nonce has been updated 
    nextTxNonce(address: "")

    # Check tx result
    transactionResult(txId: "")
    {
      blockIndex
      blockHash
      txStatus
    }
  }
}
```
- admin account address: 0xa1ef9701F151244F9aA7131639990c4664d2aEeF
