const listHeader = document.querySelector('h2');

function createTabListItem(tab) {
    const tabsObject = JSON.parse(localStorage.getItem('tabs'));
    const tabs = tabsObject ? tabsObject.tabs : [];
    const item = document.createElement('li');
    const removeButton = document.createElement('button');
    removeButton.innerHTML = "X";
    removeButton.addEventListener('click', () => {
        let tabsCopy = tabs;
        tabsCopy.splice(tabsCopy.indexOf(tab), 1);
        localStorage.setItem('tabs', JSON.stringify({tabs: tabsCopy}));
        item.remove();
    })
    const textNode = document.createElement('span')
    textNode.innerHTML = tab;
    item.appendChild(textNode);
    item.appendChild(removeButton);
    item.style.display = "flex";
    item.style.flexDirection = "row-reverse";
    item.style.justifyContent = "flex-end";
    listHeader.appendChild(item);
}

function addNewTab(tab) {
    const tabsObject = JSON.parse(localStorage.getItem('tabs'));
    const storedTabs = tabsObject ? tabsObject.tabs : [];
    const newTabs = new Set([tab, ...storedTabs]);

    localStorage.setItem('tabs', JSON.stringify({tabs: Array.from(newTabs)}));
    document.querySelector('input').value = "";
    createTabListItem(tab);
}

function clearTabs() {
    return localStorage.setItem('tabs', JSON.stringify({tabs: []}));
}

document.querySelector('input').addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        const input = document.querySelector('input');
        const tab = input.value;
        addNewTab(tab);
        input.value = "";
    }
})

const tabsObject = JSON.parse(localStorage.getItem('tabs'));
const tabs = tabsObject ? tabsObject.tabs : [];

if (tabs) {
    if (listHeader) {
        for (tab of tabs) {
            createTabListItem(tab);
        }
    }
    (function() {
        for (tab of tabs) {
            window.open(tab);
        }
    })();
}