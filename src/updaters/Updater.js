

module.exports = /*abstract*/ class Updater {
  /** @var {any[]} competitions */

  /**
   * @var {Number}
   */
  static get source_id () {
    return null
  }

  /**
   * Class constructor.
   *
   * @param {any[]} competitions
   */
  constructor (competitions) {
    this.competitions = competitions
      .filter(({ source_id }) => source_id === this.source_id)
  }

  /**
   * Collects resources to update.
   *
   * @return {Promise<any[]>}
   */
  /*abstract*/ async collect () {
    //
  }
}
