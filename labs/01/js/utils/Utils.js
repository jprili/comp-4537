class Utils {
    /**
     * Sleep for `ms` milliseconds. Asynchronous, use `await` if blocking.
     * 
     * @param {number} ms number of milliseconds to sleep
     * @returns {Promise} the resolution if finished, otherwise promise 
     */
    static sleep = (ms) => 
        new Promise((resolve) => {
            setTimeout(resolve, ms);
        });

    /**
     * Shuffle an array.
     * 
     * @param {any[]} array - the array to shuffle
     */
    static shuffled = (array) => 
        array.map((x) => { return {x, weight: Math.random()} } )
            .sort((a, b) => a.weight - b.weight)
            .map(({x}) => x);
}

export default Utils;