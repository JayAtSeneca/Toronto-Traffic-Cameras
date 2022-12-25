
function buildMenuItem(camera){
    let menuItem = document.createElement('div');

    menuItem.id = camera.number;
    
}

function buildMenu(){
    let nav = document.querySelector('nav');

    trafficCameras.forEach((camera) => {
        let cameraMenuItem = buildMenuItem(camera);
        nav.appendChild(cameraMenuItem);
    });
}


window.onload = function (){
    buildMenu();
}