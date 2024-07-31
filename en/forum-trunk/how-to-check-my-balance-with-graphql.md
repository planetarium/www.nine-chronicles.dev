## Preparation

- A agent address: All of balances stored in a agent's address.
  - i.e., `0x6132331720A774274d6E51CaeAd375068cC00505`
- A currency type to check
  - i.e., `NCG`
- GraphQL server url
  - i.e., http://9c-main-rpc-1.nine-chronicles.com/ui/playground

## Step by step

### Step #1

Open or connect to a GraphQL server.
![GraphQL playground page on web browser](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image.png)

Open the `DOCS`.
![Point the "DOCS" button](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image-1.png)
![The "DOCS" openned](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image-2.png)

Search `balance` in `DOCS` and you can see the `StateQuery.balance` query.
![Point the "StateQuery.balance" query in the "DOCS"](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image-3.png)

### Step #2

> Let's type the `StateQuery.balance` query in coding area!

Search `Address` on `DOCS`.
![Point the "scalar" type of the "Address" in the "DOCS"](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image-4.png)

Type `address` as an argument of the `balance` query.
![Underline the "address" argument of the query](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image-5.png)

Search `CurrencyInputType` on `DOCS`.
![Point the several types of the "CurrencyInputType" in the "DOCS"](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image-6.png)

Type `currency` as an argument of the `balance` query. We'll can get the `minters` address like [this](#get-currencys-minters-addresses).
![Underline the addresses of the "minters" of the "currency"](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image-7.png)

Type `quantity` in the body of the balance query.
![Underline the "quantity"](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image-8.png)

And click the play button to send the query.
![Point the play button](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image-9.png)

Then here we can get the result.
![Underline the "quantity" of the result](/images/en/forum-trunk/how-to-check-my-balance-with-graphql/image-10.png)

Here is the query.

```graphql
query
{
  stateQuery
  {
    balance
    (
      address: "0x6132331720A774274d6E51CaeAd375068cC00505",
      currency:
      {
        ticker: "NCG",
        decimalPlaces: 2,
        minters:
        [
          "0x47D082a115c63E7b58B1532d20E631538eaFADde"
        ]
      }
    )
    {
      quantity
    }
  }
}
```

## Get currency's minters addresses {#get-currencys-minters-addresses}

This query did not released yet.([PR link](https://github.com/planetarium/NineChronicles.Headless/pull/1731))

```graphql
query
{
  addressQuery
  {
    currencyMintersAddress(currency: NCG)
  }
}
```
