const Updater = require('./Updater')

/**
 * Connects to Twitter as an app.
 * @type {Twitter}
 */
const client = new require('twitter')({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
})

module.exports = class TwitterUpdater extends Updater {
  /**
   * @inheritdoc
   */
  static get source_id () {
    return 0
  }

  /**
   * @inheritdoc
   */
  async collect () {
    const tweets = await this.fetch()

    console.log('tweets', tweets)

    return tweets.map((tweet) => {
      // Finds competition.
      const competition = this.competitions.find(c => c.resource_id === tweet.id_str)

      // Counts entrants.
      const entrants = this.entrants(tweet, competition.entry_methods)

      // If # of entrants is the same, skips.
      if (entrants === competition.entrants) {
        return null
      }

      return {
        id: competition.id,
        toUpdate: { entrants }
      }
    }).filter(Boolean)
  }

  /**
   * Calculates number of entrants.
   *
   * @param {any} tweet
   *
   * @return {Number}
   */
  entrants (tweet, methods) {
    let entrants = 0

    if (methods.includes('retweet')) {
      entrants = Math.min(entrants, tweet.retweet_count)
    }

    if (methods.includes('like')) {
      entrants = Math.min(entrants, tweet.favorite_count)
    }

    return entrants
  }

  /**
   * Fetches raw data.
   *
   * @return {Promise<any[]>}
   */
  async fetch () {
    const ids = this.competitions.map(({ resource_id }) => resource_id)

    return client.get(`statuses/lookup.json?id=${ids.join(',')}`)
  }
}
