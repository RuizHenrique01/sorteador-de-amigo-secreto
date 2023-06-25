

const generateRandomPosition = (position: number, size: number): number => {
    const numberRandom = Math.floor(Math.random() * size);

    if(position === numberRandom) {
        return generateRandomPosition(position, size);
    }

    return numberRandom;
}

export default generateRandomPosition;