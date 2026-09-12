class Vec2 {
    static randomVec = (lowX, highX, lowY, highY) => {
        const randomX = lowX + ((highX - lowX) * Math.random());
        const randomY = lowY + ((highY - lowY) * Math.random());
        return new Vec2(randomX, randomY);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default Vec2;