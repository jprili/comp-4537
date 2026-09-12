class Vec2 {
    /**
     * Create a random 2D vector.
     * @param {number} lowX  - low x limit
     * @param {number} highX - high x limit
     * @param {number} lowY  - low y limit
     * @param {number} highY - high y limit
     * @returns 
     */
    static randomVec = (lowX, highX, lowY, highY) => {
        const randomX = lowX + ((highX - lowX) * Math.random());
        const randomY = lowY + ((highY - lowY) * Math.random());
        return new Vec2(randomX, randomY);
    }

    /**
     * Instantiate a 2D vector.
     * @param {number} x - x component
     * @param {number} y - y component
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default Vec2;