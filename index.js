
function buildMenuItem(camera){
    let menuItem = document.createElement('div');

    menuItem.id = camera.number;
    menuItem.className = 'menu-item';
    menuItem.title = camera.name;
    menuItem.innerText = camera.name;
    return menuItem;
}

function buildMenu(){
    let nav = document.querySelector('nav');

    trafficCameras.forEach((camera) => {
        let cameraMenuItem = buildMenuItem(camera);
        nav.appendChild(cameraMenuItem);
    });

    nav.addEventListener('click', (event)=>{
        let cameraNumber = event.target.id;
        let camera = trafficCameras.find((camera)=>{
            return camera.number === cameraNumber;
        });
        updateMap(camera.lat, camera.lng);
        updateImages(camera);
    })
}

function updateImages(camera){
    let imagesDiv = document.querySelector('#images');
    let cameraImage = document.querySelector('#camera-image');

    cameraImage.src = camera.getImageUrl();
    imagesDiv.classList.remove('hidden');

    let directionsDiv = document.querySelector('#directions');
    directionsDiv.innerHTML = '';
    let directionsData = camera.getDirectionImages();

    directionsData.forEach((data) => {
        let div = document.createElement('div');
        div.className = 'direction-camera';

        let img = document.createElement('img');
        img.src = data.url;

        let span = document.createElement('span');
        span.innerText = data.direction.toUpperCase();
        span.style.color = 'black';
        // putting the image and span in to the direction div

        div.appendChild(img);
        div.appendChild(span);


        directionsDiv.appendChild(div);
    });

}

let map;
let marker

function updateMap(lat, lng) {
  // Move or Create a marker to this intersection
  if(marker) {
    marker.setLatLng({ lat, lng });
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }

  // Update the map's location
  map.setView([lat, lng]);
}

function buildMap(){
    let senecaCoords = [43.7952, -79.3497];
    map = L.map('map').setView(senecaCoords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

window.onload = function (){
    buildMenu();
    buildMap();
}