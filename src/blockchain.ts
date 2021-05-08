import * as crypto from 'sjcl';

export interface Transaction {
    id: string;
    sender: string;
    recipient: string;
    amount: number;
}

export interface Block {
    index: number;
    timestamp: number;
    transactions: Transaction[]
    proof: number;
    previousHash: string;
}

export class Node {

}

export class Blockchain {
    nodeOwner = 'mike';
    chain: Block[] = [];
    transactionPool: Transaction[] = [];
    nodes = [];

    get lastBlock(){
        return this.chain[this.chain.length -1];
    }

    /**
     * Creates a block once a proof has successfully been mined on the network. This block is then added to the chain and broadcasted to peer nodes.
     * TODO: Broadcast added block to peers
     */
    createBlock(proof: number, previousHash?: string) {
        let block = {
            index: this.chain.length +1,
            timestamp: (new Date()).valueOf(),
            transactions: this.transactionPool,
            proof,
            previousHash: previousHash ?? this.hash(this.lastBlock)
        }
        this.transactionPool = [];
        this.chain.push(block)
        console.log('Block Created: ', block)
        return block;
    }
    
    /**
     * Add a transactions to the pool and broadcast this transaction to connected nodes
     * TODO: Broadcast to connected nodes
     */
    createTransaction(sender: string, recipient: string, amount: number) {
        let id = this.hash({sender, recipient, amount});
        this.transactionPool.push({id, sender, recipient, amount});
        console.log(`Transaction created, Amount: ${amount} In block: ${this.lastBlock?.index ?? 0 + 1}'`)
        return this.lastBlock?.index ?? 0 + 1;
    }

    /**
     * Produces SHA-256 Hash for given data
     */
    hash(data: object): string {
        let bitArray = crypto.hash.sha256.hash(JSON.stringify(data));
        return crypto.codec.hex.fromBits(bitArray);
    }

    /**
     * Tries to find a valid proof for current block using the last block's proof
     * TODO: Need to check we've not received a block from another node within this while loop
     */
    proofOfWork(lastProof: number) {
        let proof = 0;
        while(!this.isValidProof(lastProof, proof)) {
            proof += 1;
        }
        return proof;
    }

    /**
     * Verifies the proof is correct by POW rules (first 4 0000 in hash)
     */
    isValidProof(lastProof: number, proof: number): boolean {
        let guess = crypto.hash.sha256.hash(`${lastProof}${proof}`)
        let guessHash = crypto.codec.hex.fromBits(guess);
        console.log("Guess Hash..", guessHash)
        if (guessHash.substring(0, 4) == '0000') {
            console.log("Has has been guessed correctly!")
        }
        return guessHash.substring(0, 4) == '0000';
    }

    /**
     * 
     */
    mineBlock() {
        let lastProof = this.lastBlock.proof;
        let proof = this.proofOfWork(lastProof);

        // Create reward for finding proof
        this.createTransaction('0', this.nodeOwner, 1);
    }
}