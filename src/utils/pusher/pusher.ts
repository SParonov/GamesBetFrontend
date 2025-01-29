import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
  appId: "1933082",
  key: "eeb8f762cfb9f3fa219d",
  secret: "efb9e540f8da2b91cc0b",
  cluster: 'eu',
})

export const pusherClient = new PusherClient('eeb8f762cfb9f3fa219d', {
  cluster: 'eu',
})