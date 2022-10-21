const express = require("express");
const fetch = require("node-fetch");

const Block = require("./Block");
const BlockChain = require("./Blockchain");
const Transaction = require("./Transactions");
const Node = require("./blockchain_node");

const args = process.argv;
let PORT = 8080;
if (args.length > 2) {
  PORT = args[2];
}

const app = express();
app.use(express.json());

let allTransactions = [];
let transactions = [];
let nodes = [];

let genisisBlock = new Block();
let blockchain = new BlockChain(genisisBlock);

app.get("/resolve", (req, res) => {
  nodes.forEach((node) => {
    fetch(`http://${node.url}/blockchain`)
      .then((response) => response.json())
      .then((otherBlockchain) => {
        if (blockchain.blocks.length < otherBlockchain.blocks.length) {
          allTransactions.forEach((transaction) => {
            fetch(`http://${node.url}/transactions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(transaction),
            })
              .then((response) => response.json())
              .then((_) => {
                fetch(`http://${node.url}/mine`)
                  .then((response) => response.json())
                  .then((_) => {
                    fetch(`http://${node.url}/blockchain`)
                      .then((response) => response.json())
                      .then((updatedBlockchain) => {
                        console.log(updatedBlockchain);
                        blockchain = updatedBlockchain;
                        res.json(blockchain);
                      });
                  });
              });
          });
        } else {
          res.json(blockchain);
        }
      });
  });
});

app.post("/node/register", (req, res) => {
  const urls = req.body;
  urls.forEach((url) => {
    nodes.push(new Node(url));
  });

  res.json(nodes);
});

app.get("/mine", (req, res) => {
  let block = blockchain.getNextBlock(transactions);
  blockchain.addBlock(block);
  transactions.forEach((transaction) => {
    allTransactions.push(transaction);
  });
  transactions = [];
  res.json(block);
});

app.post("/transactions", (req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  const amount = req.body.amount;

  let transaction = new Transaction(from, to, amount);
  transactions.push(transaction);

  res.json(transactions);
});

app.get("/blockchain", (req, res) => {
  res.json(blockchain);
});

app.listen(PORT, () => {
  console.log(`SERVER HAS STARTED ON PORT: ${PORT}`);
});
