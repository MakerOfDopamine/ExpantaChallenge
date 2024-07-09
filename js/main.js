const E = (x) => new ExpantaNum(x)
const ge = (x) => document.getElementById(x)
const unlockID = (x) => Number(ge(x).dataset.unlockid)
const cd = (x) => x ? "inline-block" : "none"

const defaultPlayer = {
    rabbits: E(0),
    rabbitsTotal: E(0),
    money: E(0),
    moneyTotal: E(0),
    version: "0.1",
    unlocks: 0,
    buildings: [
        {
            name: "Catchers",
            baseCost: E(10),
            costScale: E(1.1),
            amount: E(0),
            baseEffect: E(0.1)
        },
        {
            name: "Cages",
            baseCost: E(100),
            costScale: E(1.1),
            amount: E(0),
            baseEffect: E(2)
        }
    ]
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

function getNextBuildingCost(id) {
    return player.buildings[id].baseCost.mul(player.buildings[id].costScale.pow(player.buildings[id].amount))
}

function getNthBuildingCost(id, n) {
    return player.buildings[id].baseCost.mul(player.buildings[id].costScale.pow(n.sub(1)))
}

function canAffordBuilding(id) {
    return player.money.gte(getNextBuildingCost(id))
}

function buyBuilding(id) {
    if (!canAffordBuilding(id)) return
    player.money = player.money.sub(getNextBuildingCost(id))
    player.buildings[id].amount = player.buildings[id].amount.add(1)
}

function buildingEffect(id) {
    return player.buildings[id].amount.mul(player.buildings[id].baseEffect)
}

function calcTotalProduction() {
    let p = E(0)
    for (let i in player.buildings) {
        p = p.add(buildingEffect(i))
    }
    return p
}

load()

gameLoop = setInterval(() => {
    // Update all gameplay values
        // player values
        ge("rabbitsDisplay").innerHTML = format(player.rabbits)
        ge("rabbitsPerSecondDisplay").innerHTML = format(calcTotalProduction(), true) // Probably can be optimised
        ge("moneyDisplay").innerHTML = format(player.money)

        // buildings display (optimise this later)
        ge("rabbitBuilding1Display").innerHTML = format(player.buildings[0].amount)
        ge("rabbitBuilding1CostDisplay").innerHTML = format(getNextBuildingCost(0))
        ge("rabbitBuilding1EffectDisplay").innerHTML = format(buildingEffect(0))

        ge("rabbitBuilding2Display").innerHTML = format(player.buildings[1].amount)
        ge("rabbitBuilding2CostDisplay").innerHTML = format(getNextBuildingCost(1))
        ge("rabbitBuilding2EffectDisplay").innerHTML = format(buildingEffect(1))

    // Handle unlocks
    ge("sellRabbitButton").style.display = cd(player.rabbits.gte(10) || player.moneyTotal.gt(0))
    ge("moneyText").style.display = cd(player.rabbits.gte(10) || player.moneyTotal.gt(0))
    ge("buildingTabButton").style.display = cd(player.moneyTotal.gte(10))
    ge("rabbitsPerSecondText").style.display = cd(calcTotalProduction().gt(0))

    // Production
    player.rabbits = player.rabbits.add(calcTotalProduction().div(30))
    
}, 33)