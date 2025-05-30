import { writeFileSync } from 'fs'
import tcpPortUsed from 'tcp-port-used'
import { localPortFile } from './server-port'

setLocalPort()

async function setLocalPort() {
    const port = await getAvailablePort()
    const data = JSON.stringify({
        serverPort: port
    })
    writeFileSync(localPortFile, data)
}

async function getAvailablePort (portNumber = 3000): Promise<number> {
    // Check to see if portNumber is in use on localhost
    return tcpPortUsed
        .check(portNumber, '127.0.0.1')
        // if port is inUse, call getPort again with the next port number
        // When an open port is found, return that number
        .then((inUse: boolean) => inUse ? getAvailablePort(portNumber+1) : portNumber)
        // If an exception is thrown, return portNumber even if in use and nuxt will default to randomly picked port
        .catch(() => portNumber)
}
