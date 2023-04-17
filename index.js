function curry(fn) {

    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2))
            }
        }
    }

}


class Calculator {
    
    constructor(x, y) {
        if (Number(x) !== x
            || Number(y) !== y
            || !Number.isFinite(x)
            || !Number.isFinite(y)
        ) {
            throw new Error()
        }
        this.x = x
        this.y = y
    }

    getSum = () => {
        return this.x + this.y
    }

    getMul = () => {
        return this.x * this.y
    }

    getDiv = () => {
        if (this.y === 0) {
            throw new Error()
        }

        return this.x / this.y
    }

    getSub = () => {
        return Math.abs(this.x - this.y)
    }

    setX = (x) => {
        if (Number(x) !== x) {
            throw new Error()
        }
        return this.x = x
    }

    setY = (y) => {
        if (Number(y) !== y) {
            throw new Error()
        }
        return this.y = y
    }
}

class RickAndMorty {

    _link = 'https://rickandmortyapi.com/api/'

    getCharacter(charId){
        if ((charId ^ 0) !== charId || charId < 1){
            throw new Error()
        }

        return fetch(this._link + 'character/' + charId, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 404) {
                    return null
                }

                return response.json()
            })
            .catch((err) => {
                throw new Error(err)
            })
    }

    async getEpisode(episodeId){
        if ((episodeId ^ 0) !== episodeId || episodeId < 1){
            throw new Error()
        }

        try {
            let result = await fetch(this._link + 'episode/' + episodeId, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (result.status === 404) {
                return await null
            }

            return await result.json()
        } catch (error) {
            throw new Error(error)
        }
    }
}