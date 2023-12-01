import { createCube } from "./app.js";

const actWindow = [
    {
        id: 0,
        dimension: {
            x: 0,
            y: 0,
        },
    nbCubes: 0,
    }
];

let idWindow = 0;

addEventListener("storage", (event) => 
{
    if (event.key == "windows")
    {
        let newWindows = JSON.parse(event.newValue);
        console.log("newWindows =", newWindows);
        console.log("newWindows.length =", newWindows.length);
        console.log("actWindow.id =", actWindow[0].id);
        if(newWindows.length > actWindow.length) {
            createCube();
        }
    }
});

window.addEventListener('beforeunload', function (e) 
{
    const storedWindows = getStoredWindows();
    console.log("storedWindows =", storedWindows);
    console.log("actWindows =", actWindow);
    console.log("actWindow.id =", actWindow[0].id);

    let index = -1;

    for (let i = 0; i < storedWindows.length; i++)
    {
        if (storedWindows[i].id == idWindow) index = i;
    }

    const windowIndex = storedWindows.findIndex(storedWindow => storedWindow.id === actWindow.id);
    storedWindows.splice(index, 1);
    console.log("storedWindows after =", storedWindows);
    const tabStoredWindows = JSON.stringify(storedWindows);
    localStorage.setItem("windows", tabStoredWindows);
    createCube();
});

export function init() {
    createNewWindow();
    calculDimension();
    pushWindow();
    console.log("init windowManager.js");
}

export function getStoredWindows() {
    const temp = localStorage.getItem("windows");
    const storedWindows = JSON.parse(temp);
    return storedWindows;
}

function createNewWindow() {
    const storedWindows = getStoredWindows() || [];
    console.log("storedWindows =", storedWindows);
    console.log("actWindows =", actWindow);
    let count = localStorage.getItem("count") || 0;
    count++;

    if (!actWindow[0].id && storedWindows && storedWindows.length > 0) {
        actWindow[0].id = count;
        idWindow = count;
        actWindow[0].nbCubes = storedWindows.length + 1;
        console.log("nombres de windows actuelle = ", storedWindows.length);
        localStorage.setItem("count", count);
        return true;
    } else if (!actWindow[0].id) {
        actWindow[0].id = count;
        idWindow = count;
        actWindow[0].nbCubes++;
        console.log("Première window");
        localStorage.setItem("count", count);
        return true;
    } else {
        return false;
    }
}

function calculDimension() {
    actWindow[0].dimension.x = window.screen.width;
    actWindow[0].dimension.y = window.screen.height;
}

function pushWindow() {
    console.log("push");

    const storedWindows = getStoredWindows();
    let tabWindows = [];

    if (storedWindows) {
        tabWindows = storedWindows;
    }

    tabWindows.push(actWindow);

    const tabWindowsString = JSON.stringify(tabWindows);
    localStorage.setItem("windows", tabWindowsString);
}
