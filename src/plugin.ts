import streamDeck, { LogLevel } from '@elgato/streamdeck'
import { IncrementCounter } from './actions/increment-counter'
import { WebSocketServer } from 'ws'

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE)

// Register the increment action.
streamDeck.actions.registerAction(new IncrementCounter())

// Finally, connect to the Stream Deck.
streamDeck.connect()

const wss = new WebSocketServer({ port: 8080 })

const device = streamDeck.devices.values().next().value
const deviceId = device.id
wss.on('connection', function connection(ws) {
  ws.on('error', console.error)
  ws.on('message', function message(data) {
    const message = data.toString()
    if (device) {
      switch (message) {
        case '0':
          streamDeck.client.switchToProfile(deviceId, 'Profile 1')
          break
        case '1':
          streamDeck.client.switchToProfile(deviceId, 'Profile 2')
          break
        case '2':
          streamDeck.client.switchToProfile(deviceId, 'Profile 3')
          break
        default:
          break
      }
    }
  })
})
