class NeuralNetwork {
    constructor(neuronCounts) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }

    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }

    static mutate(network, amount = 1) {
        // Use linear interpolation (lerp) to slightly change the bias.
        // 'amount' controls how much the mutation affects the original bias.
        network.levels.forEach(level => {
            for (let i = 0; i < level.biases.length; i++) { 
                level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(level.weights[i][j], Math.random() * 2 - 1, amount);
                }
            }
        });
    }
}

class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount).fill(0).map(() => Math.random()); // Initialize inputs with random values
        this.outputs = new Array(outputCount).fill(0).map(() => Math.random()); // Initialize outputs with random values
        this.biases = new Array(outputCount).fill(0).map(() => Math.random()); // Initialize biases with random values
        this.weights = [];

        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount).fill(0).map(() => Math.random()); // Initialize weights with random values
        }

        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(givenInputs, level) {
        for (let i = 0; i < level.inputs.length; i++) {  // Sensor based Inputs
            level.inputs[i] = givenInputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) { // Hidden Layer computations
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }

            level.outputs[i] = Math.max(0, sum + level.biases[i]); // Outputs -> forward,left,right,reverse
        }

        return level.outputs;
    }
}

function lerp(a, b, t) { // Linear Interpolation 
    return a + (b - a) * t;
}