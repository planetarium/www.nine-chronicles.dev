# GraphQL (Mimir)

Mimir is a service that allows you to easily query the latest state of Nine Chronicles using GraphQL. Separate services are provided for each network, and the paths for Odin and Heimdall are as follows:

- [Mimir Odin](https://mimir.nine-chronicles.dev/odin/graphql/) 
- [Mimir Heimdall](https://mimir.nine-chronicles.dev/heimdall/graphql/)

## Status Query

When you access Mimir, a Playground is provided, making it easy to create queries.  
To create a query: 
- Click `Create Document`
- Click `Builder +` button 
- Choose `New Query` 
- Enter a query name 
- Select the checkboxes to build the query  
![alt text](/graphql-mimir-sample.png)

Here is an example of a simple query:

```gql
query GetArenaSheet {
  sheet(sheetName: "ArenaSheet") {
    name
    csv
  }
}
```

For detailed usage instructions, please refer to this [link](https://chillicream.com/docs/nitro/v2/explore-the-ui).
