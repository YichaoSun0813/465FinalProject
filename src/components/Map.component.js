import React from 'react';
import "./style.css"
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        position: 'absolute',
        width: '80%',
        height: '80%'
    }
};

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);

        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState ({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }

        this.loadMap();
    }
   
    componentDidUpdate (prevProps, prevState) {

        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }

        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }


    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;

            const node = ReactDOM.findDOMNode(mapRef);

            let { zoom } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign (
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );

            this.map = new maps.Map(node, mapConfig);
        }
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.correntLocation
            });
        });
    }

    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }

    render() {
        const style = Object.assign({}, mapStyles.map);
        return (
            <div>
                <div style={style} ref="map">
                Loading map...
                </div>}
                {this.renderChildren()}
            </div>
        );
    }
}

export default CurrentLocation;

//default the current location to Portland, OR
CurrentLocation.defaultProps = {
    zoom: 14,
    
    initialCenter: {
        lat: 45.5127,
        lng: -122.6750, 
    },

    centerAroundCurrentLocation: false,
    visible: true
};
