import express, { Request, Response } from 'express';
import { Blockchain, Transaction } from './blockchain';

export class Server {
    app: express.Application = express();
    router: express.Router = express.Router();
    blockchain: Blockchain = new Blockchain();

    constructor(port: number) {
        this.app.listen(port, () => console.log(`Node started on port ${port}`));

        this.router.get('/discover', (req: Request, res: Response) => {
            let nodeAddr: string = <string>req.query.id;
            this.blockchain.addNodePeer(nodeAddr);
            res.sendStatus(200);
        });

        this.router.post('/transaction', (req: Request, res: Response) => {
            let tx = req.body as Transaction;
            this.blockchain.receiveTransaction(tx);
            res.sendStatus(200);
        });

        this.app.use('/', this.router);
    }
}
new Server(parseInt(process.env.PORT ?? '5000'));