class Stack{
    #stack = []
    #limit
    #size = 0

    constructor(limit = 10) {
        if (!Number.isInteger(limit) || limit <= 0 || limit > 10) {
            throw new Error('Invalid limit value')
        }
        this.#limit = limit
    }

    push(elem) {
        if (this.#size >= this.#limit) {
            throw new Error('Limit exceeded')
        }

        this.#stack = [...this.#stack, elem]
        ++this.#size
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Empty stack')
        }

        let newStack = this.#crop()
        let last = this.#stack[this.#size - 1]
        --this.#size
        this.#stack = newStack

        return last
    }

    #crop(index = 0, stack = []) {
        if (index < this.#size - 1) {
            stack = [this.#stack[index], ...this.#crop(index + 1, stack)]
        }

        return stack
    }

    peek() {
        let returnElem = null

        if (!this.isEmpty()) {
            returnElem = this.#stack[this.#size - 1]
        }

        return returnElem
    }

    isEmpty() {
        return this.#size === 0
    }

    toArray() {
        return this.#stack
    }

    static fromIterable(iterable) {
        if (iterable === null || typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error('Not iterable')
        }

        let length = 0

        for (let item of iterable) {
            length++
        }

        let obj = new Stack(length)

        for (let item of iterable) {
            obj.push(item)
        }

        return obj
    }
}

class LinkedList  {
    #list = []

    append(elem) {
        this.#list = [...this.#list, elem]
    }

    prepend(elem) {
        this.#list = [elem, ...this.#list]
    }

    find(elem) {
        for (let item of this.#list) {
            if (item === elem) {
                return elem
            }
        }
        return null
    }

    toArray() {
        return this.#list
    }

    static fromIterable(iterable) {
        if (iterable === null || typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error('Not iterable')
        }

        let obj = new LinkedList

        for (let item of iterable) {
            obj.append(item)
        }

        return obj
    }
}

class Car {
    #brand = ''
    #model = ''
    #yearOfManufacturing = 1950
    #maxSpeed = 100
    #maxFuelVolume = 20
    #fuelConsumption = 1
    #damage = 1
    #currentFuelVolume = 0
    #isStarted = false
    #mileage = 0
    #health = 100

    start() {
        if (this.#isStarted) {
            throw new Error('Car has already started')
        }
        this.#isStarted = true
    }

    shutDownEngine() {
        if (!this.#isStarted) {
            throw new Error('Car hasn\'t started yet')
        }
        this.#isStarted = false
    }

    fillUpGasTank(fuelAmount) {
        if (!Number.isFinite(fuelAmount) || fuelAmount <= 0 || !Number.isInteger(fuelAmount)) {
            throw new Error('Invalid fuel amount')
        }

        if (fuelAmount + this.#currentFuelVolume > this.#maxFuelVolume) {
            throw new Error('Too much fuel')
        }

        if (this.#isStarted) {
            throw new Error('You have to shut down your car first')
        }

        this.#currentFuelVolume += fuelAmount
    }

    drive(speed, duration) {
        if (!Number.isFinite(speed) || speed <= 0 || !Number.isInteger(speed)) {
            throw new Error('Invalid speed')
        }

        if (!Number.isFinite(duration) || duration <= 0 || !Number.isInteger(duration)) {
            throw new Error('Invalid duration')
        }

        if (speed > this.#maxSpeed) {
            throw new Error('Car can\'t go this fast')
        }

        if (!this.#isStarted) {
            throw new Error('You have to start your car first')
        }

        let distance = speed * duration

        let tripFuelConsumption = (distance / 100) * this.#fuelConsumption
        let tripHealthConsumption = (distance / 100) * this.#damage

        if (tripFuelConsumption > this.#currentFuelVolume) {
            //Если недостаточно топлива для совершения поездки (надо вычислить), выкидывает ошибку (You don't have enough fuel)
            throw new Error('You don\'t have enough fuel')
        }

        if (tripHealthConsumption > this.#health) {
            //Если недостаточно “здоровья” для совершения поездки (надо вычислить), выкидывает ошибку (Your car won’t make it)
            throw new Error('Your car won\'t make it')
        }

        this.#currentFuelVolume -= tripFuelConsumption
        this.#health -= tripHealthConsumption
        this.#mileage += distance
    }

    repair() {
        if (this.#isStarted) {
            throw new Error('You have to shut down your car first')
        }

        if (this.#currentFuelVolume === 0) {
            throw new Error('You have to fill up your gas tank first')
        }

        this.#health = 100
    }

    getFullAmount() {
        return this.#maxFuelVolume - this.#currentFuelVolume
    }

    get brand() {
        return this.#brand
    }

    set brand(value) {
        if (typeof value !== 'string' || value.trim().length < 1 || value.trim().length > 50) {
            throw new Error('Invalid brand name')
        }

        return this.#brand = value.trim()
    }

    get model() {
        return this.#model
    }

    set model(value) {
        if (typeof value !== 'string' || value.trim().length < 1 || value.trim().length > 50) {
            throw new Error('Invalid model name')
        }

        return this.#model = value.trim()
    }

    get yearOfManufacturing() {
        return this.#yearOfManufacturing
    }

    set yearOfManufacturing(value) {
        if (Number.isInteger(value) || value < 1950 || value > 2023) {
            throw new Error('Invalid year of manufacturing')
        }

        return this.#yearOfManufacturing = value
    }

    get maxSpeed() {
        return this.#maxSpeed
    }

    set maxSpeed(value) {
        if (Number.isInteger(value) || value < 100 || value > 330) {
            throw new Error('Invalid max speed')
        }

        return this.#maxSpeed = value
    }

    get maxFuelVolume() {
        return this.#maxFuelVolume
    }

    set maxFuelVolume(value) {
        if (Number.isInteger(value) || value < 20 || value > 100) {
            throw new Error('Invalid max fuel volume')
        }

        return this.#maxFuelVolume = value
    }

    get fuelConsumption() {
        return this.#fuelConsumption
    }

    set fuelConsumption(value) {
        if (Number.isInteger(value) || value < 1) {
            throw new Error('Invalid fuel consumption')
        }

        return this.#fuelConsumption = value
    }

    get damage() {
        return this.#damage
    }

    set damage(value) {
        if (Number.isInteger(value) || value < 1 || value > 5) {
            throw new Error('Invalid damage')
        }
        
        return this.#damage = value
    }

    get currentFuelVolume() {
        return this.#currentFuelVolume
    }

    get isStarted() {
        return this.#isStarted
    }

    get health() {
        return this.#health
    }

    get mileage() {
        return this.#mileage
    }
}
