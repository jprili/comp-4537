class StorageDAO {
    /**
     * @constructor
     * @param {Storage} backend - data backend, must support localStorage ops
     */
    constructor(backend) {
        /**
         * @type {Storage}
         */
        this.backend = backend;
    } 

    /**
     * Delete from storage
     * @param {string} key 
     */
    remove = (key) => {
        this.backend.removeItem(key);
    }

    /**
     * Add or update `key` with `value`.
     * @param {string} key - the key of the storage item
     * @param {string} value - the value to change to
     */
    update = (key, value) => {
        this.backend.setItem(key, value);
    }

    /**
     * Obtain value of `key`
     * @param {string} key - the requested key
     */
    get = (key) => {
        return this.backend.getItem(key);
    }
}

export default StorageDAO;