function frac(x) {
    if (x < 0) return frac(-x)
    return x - Math.floor(x)
}

function round(x, d = 0) {
    return Math.round(x * (10 ** d)) / (10 ** d)
}

function format(x, v) {
    x = new ExpantaNum(x)

    if (x.layer > 0) {
        // J time!
        if (x.layer < 5) {
            x.layer--
            return "J" + format(x)
        } else {
            J = "J^" + format(x.layer)
            x.layer = 0
            return J + format(x)
        }
    }
    else if (x.gte(new ExpantaNum(10).pent(5))) {
        // TODO: Gx and higher letter formatting
        return x.toStringWithDecimalPlaces(2)
    }
    else if (x.gte(new ExpantaNum(10).tetr(1e12))) {
        s = x.slog()
        return "F" + format(s)
    }
    else if (x.gte("eeee1e9")) {
        s = x.slog().toNumber()
        return round(10**frac(s), s > 10000 ? 0 : 3) + "F" + format(round(s))
    }
    else if (x.gte("eee1e9")) return "eee" + format(x.log10().log10().log10())
    else if (x.gte("ee1e9")) return "ee" + format(x.log10().log10())
    else if (x.gte("e1e9")) return "e" + format(x.log10())
    else if (x.gte("9e15")) {
        d = 3
        if (x.gte("e1e6")) d = 0
        else if (x.gte("1e100")) d = 2
        m = round(10**frac(x.array[0][1]), d)
        e = format(Math.floor(x.array[0][1]), true)
        return m + "e" + e
    }
    else if (x.gte(1e12)) return x.toExponential(3).replace("+", "")
     else if (x.gte(1000)) return x.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    else if (x.gte(1)) return x.toFixed(v ? 2 : 0)
    else if (x.eq(0)) return "0"
    else return x.toFixed(v ? 3 : 0)
}

