class GameState {
    /**
     * Singleton instance of the GameState
     * @type { GameState | null }
     */
    static instance = null;

    /**
     * Obtain the instance of a GameState
     * 
     * @returns { GameState } the instance
     */
    static getInstance = () => {
        if (GameState.instance === null) {
            GameState.instance = new GameState(); 
        }
        return GameState.instance;
    }

    constructor() {
        this.isCompleted = false;
        this.isSuccess = false; 
        this.nextButtonId = 1;
    }

    /**
     * Reset the instance of the GameState.
     */
    reset = () => {
        const instance = GameState.instance;
        instance.isCompleted = false;
        instance.isSuccess = false; 
        instance.nextButtonId = 1;
    }

    /**
     * Updates the GameState based on the clicked Id.
     *  
     * @param {number} clickedId - the clicked button Id
     * @param {number} length    - the max button size
     */
    click = (clickedId, length) => {
        const instance = GameState.instance;
        if (clickedId === instance.nextButtonId) {
            if (clickedId === length) {
                instance.isCompleted = true;
                instance.isSuccess   = true;
                return;
            }
            ++instance.nextButtonId;
        } else {
            instance.isCompleted = true;
            instance.isSuccess = false;
        }
    }
}

export default GameState;