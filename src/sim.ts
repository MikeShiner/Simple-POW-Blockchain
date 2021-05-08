import { Blockchain, Transaction } from "./blockchain";
import * as _ from 'lodash'
let blockchain = new Blockchain()

// Create Genesis block
blockchain.createBlock(1, '0');

let transaction2 = {sender: 'mike', receiver: 'tom', amount: 5};
let transaction3 = {sender: 'dan', receiver: 'emma', amount: 10};
let transaction4 = {sender: 'sophie', receiver: 'mike', amount: 2.4};
blockchain.createTransaction(transaction2.sender, transaction2.receiver, transaction2.amount);
blockchain.createTransaction(transaction3.sender, transaction3.receiver, transaction3.amount);
blockchain.createTransaction(transaction4.sender, transaction4.receiver, transaction4.amount);

blockchain.mineBlock();



const transactionGenerator = () => {
    let userList = ['mike', 'dan', 'tom', 'emma', 'sophie'];
    var [sender, receiver] =  _.sampleSize(userList, 2)
    let amount = _.random(0.1, 100)
    blockchain.createTransaction(sender, receiver, amount);
}

setInterval(transactionGenerator, _.random(1000, 5000))