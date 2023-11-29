const actWindow = {
    id: null,
    dimension: {
        x: 0,
        y: 0,
    },
    nbCubes: 0,
    firstWindow: false,
}

export function init() {
    const value = verifyNewWindow();

    if(value == true) {
        calculDimension();
        pushWindow();
    }
    console.log("init windowManager.js");
}

function getStoredWindows() {
    const storedWindows = localStorage.getItem("windows");
    return storedWindows;
}

function verifyNewWindow() {
    const storedWindows = getStoredWindows();

    if (!actWindow.id && storedWindows && storedWindows.length > 0) {
        const windows = JSON.parse(storedWindows);
        actWindow.id = windows.length + 1;
        actWindow.nbCubes = windows.length + 1;
        return true;
    } else if (!actWindow.id) {
        actWindow.id = 1;
        actWindow.firstWindow = true;
        actWindow.nbCubes++;
        console.log("Première window");
        return true;
    } else {
        return false;
    }
}

function calculDimension() {
    actWindow.dimension.x = window.screen.width;
    actWindow.dimension.y = window.screen.height;
}

function pushWindow() {
    console.log("push");

    const storedWindows = getStoredWindows();
    let tabWindows = [];

    if (storedWindows) {
        tabWindows = JSON.parse(storedWindows);
    }

    tabWindows.push(actWindow);

    const tabWindowsString = JSON.stringify(tabWindows);
    localStorage.setItem("windows", tabWindowsString);
}