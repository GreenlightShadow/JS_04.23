function makeDeepCopy(obj) {
    if (typeof obj !== 'object' || obj === null){
        throw new Error()
    }

    return  cloning(obj)

    function cloning(obj) {
        let result = Array.isArray(obj) ? [] : {}
            result = Object.assign(result, obj)
        Object.keys(result).forEach((key) => {
                if(typeof obj[key] === "object" && obj[key] !== null) {
                    if(obj[key] instanceof Map) {
                        let map = new Map()
                        for (let i in map) {
                            result[key][i] = map[i]
                        }
                    } else {
                        result[key] = cloning(obj[key])
                    }
                } else {
                    result[key] = obj[key]
                }
            }
        )

        return result
    }
}

function selectFromInterval(numbers, from, to) {
    for (let number of numbers) {
        if (!Number.isFinite(number)
            || !Number.isFinite(from)
            || !Number.isFinite(to)) {
            throw new Error()
        }
    }

    if (from > to) {
        [from, to] = [to, from]
    }

    return numbers.filter((number) => (number >= from && number <= to))
}

function createIterable(from, to) {
    if (!Number.isFinite(to)
        || !Number.isFinite(from)
        || to < from) {
        throw new Error()
    }

    let iterable = []
    for(let i = from; i <= to; i++) {
        iterable.push(i)
    }

    return iterable
}