class GameState {
    static instance = null;
    static getInstance = () => {
        if (instance === null) {
            instance = GameState.reset();
        }
        return instance;
    }

    constructor() {
        this.isCompleted = false;
        this.isSuccess = false; 
        this.nextButtonId = 1;
    }
    
}

export default GameState;