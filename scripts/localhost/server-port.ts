import { readFileSync } from 'fs'
import { resolve } from 'path'

export const localPortFile = resolve(`${__dirname}/server-port.json`)

export function getLocalPort() {
    const json = readFileSync(localPortFile, 'utf8')
    const data = JSON.parse(json)
    return data.serverPort
}
