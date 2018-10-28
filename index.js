const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })
const SQS = new AWS.SQS()

exports.handler = (_a, _b, callback) => {
  return require('./src/fetcher')()
    // Parses the resources array.
    .then(resources => require('./src/updaters')(resources))
    // Pushes parsed competitions to a persistor queue.
    .then((competitions) => {
      return competitions.length
        ? SQS.sendMessage({
          MessageBody: JSON.stringify({ competitions, method: 'PUT' }),
          QueueUrl: process.env.PERSISTOR_QUEUE_URL,
          MessageGroupId: Date.now() + []
        })
        .promise()
        .then(console.log)
        .then(() => competitions.length)
      : Promise.resolve(0)
    })
    .then(len => callback(null, `Update of ${len} competitions successful.`))
}
