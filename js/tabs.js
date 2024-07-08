var currentTab = 0
let tabs = document.getElementsByClassName("tab")

function switchTab(x) {
    currentTab = x
}

tabLoop = setInterval(() => {
    for (i of tabs) {
        i.style.display = Number(i.dataset.tab) == currentTab ? "inline-block" : "none"
    }
}, 33)