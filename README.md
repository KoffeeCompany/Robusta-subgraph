# Robusta - Subgraph

This project was created during the hackaton EthGlobal Unicode.

## Development server

The subgraph needs Docker up and JSON-RPC server at `http://127.0.0.1:8545/` to run in localhost.

Be sure than the docker deamon is up before run this following command.
Run `yarn run-graph-node` to run it locally.  It will automatically download the latest blocks from Ethereum. This may take a few minutes....

Run successively these commands in another terminal.
Run `yarn graph-prepare` to prepare the graph.
Run `yarn graph-codegen` to generate the subgraph code.
Build with `yarn graph-build`.
And finally, deploy it with `yarn graph-deploy-local`.