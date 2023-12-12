import { createCube, updateWindowShape } from "./app.js";

const actWindow = [];

let idWindow = 0;

addEventListener("storage", (event) => {
    if (event.key == "windows") {
        let newWindows = JSON.parse(event.newValue);
        if (newWindows.length > actWindow.length || newWindows.length < actWindow.length || newWindows.length == actWindow.length) {
            createCube();
        }
    }
});

window.addEventListener('beforeunload', function (e) {
    const storedWindows = getStoredWindows();

    let index = -1;

    for (let i = 0; i < storedWindows.length; i++) {
        if (storedWindows[i].id == idWindow) index = i;
    }

    const windowIndex = storedWindows.findIndex(storedWindow => storedWindow.id === actWindow.id);
    storedWindows.splice(index, 1);
    const tabStoredWindows = JSON.stringify(storedWindows);
    localStorage.setItem("windows", tabStoredWindows);
    createCube();
});

export function init() {
    const storedWindows = getStoredWindows() || [];
    let count = localStorage.getItem("count") || 0;
    count++;
    idWindow = count;
    let id = count;
    let shape = calculDimension();
    const winData = { id: id, shape: shape };
    actWindow.push(winData);
    storedWindows.push(winData);
    localStorage.setItem("count", count);
    pushWindow(storedWindows);
}

export function getStoredWindows() {
    const temp = localStorage.getItem("windows");
    const storedWindows = JSON.parse(temp);
    return storedWindows;
}

function createNewWindow() {
    const storedWindows = getStoredWindows() || [];
    let count = localStorage.getItem("count") || 0;
    count++;

    if (!actWindow[0].id && storedWindows && storedWindows.length > 0) {
        actWindow[0].id = count;
        idWindow = count;
        actWindow[0].nbCubes = storedWindows.length + 1;
        localStorage.setItem("count", count);
        return true;
    } else if (!actWindow[0].id) {
        actWindow[0].id = count;
        idWindow = count;
        actWindow[0].nbCubes++;
        localStorage.setItem("count", count);
        return true;
    } else {
        return false;
    }
}

function calculDimension() {
    let shape = { x: window.screenLeft, y: window.screenTop, w: window.innerWidth, h: window.innerHeight };
    return shape;
}

function pushWindow(storedWindows) {
    localStorage.setItem("windows", JSON.stringify(storedWindows));
}

export function updateShape() {
    let winShape = calculDimension();
    let storedWindow = getStoredWindows();



    if (winShape.x != actWindow[0].shape.x ||
        winShape.y != actWindow[0].shape.y ||
        winShape.w != actWindow[0].shape.w ||
        winShape.h != actWindow[0].shape.h) {

        actWindow[0].shape = winShape;

        let index = -1;

		for (let i = 0; i < storedWindow.length; i++)
		{
			if (storedWindow[i].id == idWindow) index = i;
		}

        storedWindow[index].shape.h = winShape.h;
        storedWindow[index].shape.w = winShape.w;
        storedWindow[index].shape.x = winShape.x;
        storedWindow[index].shape.y = winShape.y;

        updateWindowShape();

        pushWindow(storedWindow)
    }
}
