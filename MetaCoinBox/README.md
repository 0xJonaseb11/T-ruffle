### About
These are application templates that create token that can be transferred btn accounts.

Note that this is not ERC20 compatible

### Getting started

```bash
truffle unbox metacoin [PATH/TO/DIRECTORY]
```

### Running overall tests
```sh
truffle test
```

### Testing individual files
```sh
truffle test ./test/TestMetaCoin.sol && truffle test ./test/metacoin.js
```
### Compile
```sh
truffle compile
```

### Migrating with `truffle develop`
```sh
truffle develop

```

#### Note that : : By difault, `truffle migrate` will also run `truffle migrate`. So you can simply run : : 

```sh
migrate
```
#### This shows the transaction IDs and addresses of your deployed contracts. It also includes a cost summary and real-time status updates.

#### Migrate with Truffle Console

```sh
# truffle-config.js

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: ""
        }
    }
};
```

