class GameState {
    static instance = null;
    static getInstance = () => {
        if (instance === null) {
            GameState.reset();
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
        if (GameState.instance !== null) {
            this.isCompleted = false;
            this.isSuccess = false; 
            this.nextButtonId = 1;
        } else {
            GameState.instance = new GameState();
        }
    }

    /**
     * Updates the GameState based on the clicked Id.
     *  
     * @param {number} clickedId - the clicked button Id
     * @param {number} length    - the max button size
     */
    click = (clickedId, length) => {
        if (clickedId === this.nextButtonId) {
            if (clickedId === length) {
                this.isCompleted = true;
                this.isSuccess   = true;
                return;
            }
            ++this.nextButtonId;
        } else {
            this.isCompleted = true;
            this.isSuccess = false;
        }
    }
}

export default GameState;