function save() {
    let savedata = LZString.compress(JSON.stringify(player))
    localStorage.setItem("ENCSave", savedata)
    return savedata
}

function load(x) {
    let savedata;
    if (x) savedata = x
    else savedata = localStorage.getItem("ENCSave")
    try {
        let data = JSON.parse(LZString.decompress(savedata))
        if (typeof data == "object") player = data;
        else player = defaultPlayer;
        player = fixValues(player);
        fixOldVersions(); // Hopefully this do weird shit when run all the time
        return
    } catch {player = defaultPlayer; console.log("load unsuccessful for whatever reason or just hard reset")}
}

function Export() {
    alert("Save copied to clipboard!")
    navigator.clipboard.writeText(save())
}

function Import() {
    load(prompt("Input save data."))
}

function fixValues(o) {
    if (Array.isArray(o)) {
        for (let i in o) {
            o[i] = fixValues(o[i])
        }
        return o
    }
    
    if (typeof o !== "object") return o

    let v = Object.keys(o)
    if (v.includes("sign") && v.includes("array") && v.includes("layer")) {
        o = new ExpantaNum(o)
        return o
    }

    for (let i of v) {
        o[i] = fixValues(o[i])
    }

    return o
}

function hardReset() {
    if (confirm("Are you sure you want to reset the game? This unlocks nothing and will permanently erase your entire game.") && (prompt("Type 'I want to reset my game' into the textbox to reset.") == "I want to reset my game")) {
        player = null
        save()
        window.location.reload()
    }
}

function fixOldVersions() {
    if (player.version == undefined) {
        player.version = "0.0"
        player = defaultPlayer
        console.log("no version detected, can't fix save")
        return
    }

    if (player.version == "0.0") {
        player.buildings = defaultPlayer.buildings
        player.version = "0.1"
        console.log("0.0 => 0.1")
    }
}

setInterval(() => {
    save()
}, 15000);