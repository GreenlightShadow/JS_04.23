Array.prototype.customFilter = function (fn, obj) {
    let filtered = []

    for (let i = 0; i < this.length; i++) {
        if (fn.call(obj, this[i], i, this)) {
            filtered.push(this[i])
        }
    }

    return filtered
}

function createDebounceFunction(fn, time) {
    let timer

    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => fn.call(this), time)
    }
}
