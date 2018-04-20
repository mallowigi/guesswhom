import * as axios from 'axios';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

export default {
  getLogos() {
    return axios.get(`${SERVER_URL}/logos`);
  },
  /**
   * Shuffles an array
   * @param a
   * @returns {*}
   */
  shuffle(a) {
    const array = a;
    // eslint-disable-next-line no-plusplus
    for (let i = array.length; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const x = array[i - 1];
      array[i - 1] = array[j];
      array[j] = x;
    }
    return array;
  },

  /**
   * Generate ids for items
   * @param arr
   * @returns {*}
   */
  generateIds(arr) {
    return arr.map((item, index) => ({
      id: index,
      ...item,
    }));
  },
};
