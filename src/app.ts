import { Blockchain, Transaction } from "./blockchain";

let blockchain = new Blockchain()
let transaction1 = {sender: 'mike', receiver: 'tom', amount: 5};

blockchain.createTransaction(transaction1.sender, transaction1.receiver, transaction1.amount);

blockchain.createBlock(1, '0');

let transaction2 = {sender: 'mike', receiver: 'tom', amount: 5};
let transaction3 = {sender: 'dan', receiver: 'emma', amount: 10};
let transaction4 = {sender: 'sophie', receiver: 'mike', amount: 2.4};
blockchain.createTransaction(transaction2.sender, transaction2.receiver, transaction2.amount);
blockchain.createTransaction(transaction3.sender, transaction3.receiver, transaction3.amount);
blockchain.createTransaction(transaction4.sender, transaction4.receiver, transaction4.amount);
blockchain.createBlock(2);
console.log('Block Created: ', blockchain.lastBlock)