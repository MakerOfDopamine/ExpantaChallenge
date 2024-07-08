const E = (x) => new ExpantaNum(x)
const ge = (x) => document.getElementById(x)
const unlockID = (x) => Number(ge(x).dataset.unlockid)
const cd = (x) => x ? "inline-block" : "none"

const defaultPlayer = {
    rabbits: E(0),
    rabbitsTotal: E(0),
    money: E(0),
    moneyTotal: E(0),
    version: "0.0",
    unlocks: 0
}

let player;

function getRabbits() {
    player.rabbits = player.rabbits.add(1)
    player.rabbitsTotal = player.rabbitsTotal.add(1)
}

function sellRabbits() {
    player.money = player.money.add(player.rabbits)
    player.moneyTotal = player.moneyTotal.add(player.rabbits)
    player.rabbits = E(0)
}

load()

gameLoop = setInterval(() => {
    // Update all gameplay values
    ge("rabbitsDisplay").innerHTML = format(player.rabbits, true)
    ge("moneyDisplay").innerHTML = format(player.money, true)

    // Handle unlocks
    ge("sellRabbitButton").style.display = cd(player.rabbits.gte(10) || player.moneyTotal.gt(0))
    ge("moneyText").style.display = cd(player.rabbits.gte(10) || player.moneyTotal.gt(0))
    ge("buildingTabButton").style.display = cd(player.moneyTotal.gte(10))
}, 33)