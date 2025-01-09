export class functions {

    static async getRandomNumber(max) {
        return Math.floor(Math.random() * (max - 1)) + 1;
    }

    static async convertToNumber(priceString) {
        return parseFloat(priceString);
    }
}