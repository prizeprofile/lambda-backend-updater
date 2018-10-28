const Twitter = require('./Twitter')

const updaters = [
  Twitter
]

module.exports = async (competitions) => {
  const sponge = []

  // Tries to update all competitions.
  for (let Updater of updaters) {
    try {
      sponge.push(...await new Updater(competitions).collect())
    } catch(e) {
      console.log(e)
    }
  }

  return sponge
}
