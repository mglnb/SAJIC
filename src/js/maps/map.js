import maps from 'google-maps';
import geocoder from 'google-geocoder';
import {
    styles
} from './map-styles';

const apiKey = 'AIzaSyC8Cgnl7akhQo_bIL9fBByOcyHrGgA35uk';

const geo = geocoder({
    key: apiKey
});

maps.KEY = apiKey;

class Map {
    constructor(el, coords) {
        this.el = document.querySelector(el);
        this.options = {
            zoom: 17,
            styles
        };
    }

    init() {

        maps.load(google => {
            let image = {
                url: './img/marker.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(128, 128),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(65, 140),
            };

            let contentString = `

            <div class=" map-info">
            <div class="logo">
                <img src="./img/senac_logo.png">
            </div>
        
        <div class="flex">
            <div class="btn">
                <a href="#">
                    <div class="icon">
                        <span class="lnr lnr-phone"></span>
                    </div>
                    <div class="info">
                        (53) 3225-6918
                    </div>
                </a>
            </div>
            <div class="btn">
                <a href="#">
                    <div class="icon">
                    <span class="lnr lnr-map"></span>                    
                    </div>
                    <div class="info">
                        Rua Gonçalves Chaves, 602, Centro, Pelotas
                    </div>
                </a>
            </div>
            <div class="btn">
                <a href="#">
                    <div class="icon">
                    <span class="lnr lnr-graduation-hat"></span>                    
                    
                    </div>
                    <div class="info">
                        Conheça a Faculdade
                    </div>
                </a>
            </div>
        </div>
        <br>
        <br>
        <br>

        </div>
    
              `
            let infowindow = new google.maps.InfoWindow({
                content: contentString,
            });
            let map = new google.maps.Map(this.el, this.options);
            let marker = new google.maps.Marker({
                position: this.options.center,
                title: 'Faculdade de Tecnologia SENAC',
                animation: google.maps.Animation.DROP,
                icon: image,
                map
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
            return map;
        });
    }

    fetchLocation(address) {

        return new Promise((resolve, reject) => {
            geo.find(address, (err, data) => {
                this.options.center = data[0].location;
                resolve();
            });
        });
    }
}

export default Map;