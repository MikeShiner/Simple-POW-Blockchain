import { Blockchain, Transaction } from "./blockchain";
import * as _ from 'lodash'

import axios, { AxiosResponse } from 'axios'

const nodes = ['localhost:5000', 'localhost:5001']
const generateTransaction = () => {
    let userList = ['mike', 'dan', 'tom', 'emma', 'sophie'];
    var [sender, receiver] = _.sampleSize(userList, 2)
    let amount = _.random(0.1, 100)
    return { sender, receiver, amount }
}

const runSim = async () => {
    let discoveryPromises: Promise<AxiosResponse<any>>[] = []
    nodes.forEach(node => {
        nodes.forEach(discoveredNode => {
            if (node !== discoveredNode) {
                discoveryPromises.push(axios.get(`http://${node}/discover?id=${discoveredNode}`));
            }
        })
    })
    await Promise.all(discoveryPromises)

    setInterval(() => {
        let tx = generateTransaction();
        axios.post(`http://${_.sampleSize(nodes, 1)}/transactions`, tx)
    }, _.random(1000, 5000))


}
runSim();



