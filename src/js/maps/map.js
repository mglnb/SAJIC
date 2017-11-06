import maps from 'google-maps';
import geocoder from 'google-geocoder';
import { styles } from './map-styles';

const apiKey = 'AIzaSyC8Cgnl7akhQo_bIL9fBByOcyHrGgA35uk';

const geo = geocoder({
    key: apiKey
});

maps.KEY = apiKey;

class Map {
    constructor(el, coords) {
        this.el = document.querySelector(el);
        this.options = {
            zoom: 18,
            styles
        };
    }

    init() {
        
        maps.load(google => {
            
            let map = new google.maps.Map(this.el, this.options);
            let marker = new google.maps.Marker({
                position: this.options.center,
                title: 'Faculdade de Tecnologia SENAC',
                map
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