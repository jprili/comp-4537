class Utils {
    /**
     * 
     * @param {number} ms number of milliseconds to sleep
     * @returns {Promise} the resolution if finished, otherwise promise 
     */
    static sleep = (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
    }
}

export default Utils;