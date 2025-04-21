const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-8939c2e2-53d1-4049-b337-b385c4bd7677',
  subscribeKey: 'sub-c-d55c8042-5ecd-48ea-b247-638ca2e727c7',
  secretKey: 'sec-c-Y2VjM2ViMjUtMDI1Mi00MWI0LTliMWItZDhlZDA4MDQ5MjVj'
};

const CHANNELS = {
  TEST: 'TEST'
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

    this.pubnub.addListener(this.listener());
  }

  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;

        console.log(`Message received. Channel: ${channel}. Message; ${message}`);
      }
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}

// const testPubSub = new PubSub();
// testPubSub.publish({ channel: CHANNELS.TEST, message: 'hello pubnub 101' });

module.exports = PubSub;
