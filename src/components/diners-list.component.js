import React, { Component } from 'react';
import "./style.css";
import axios from 'axios';
import { Map } from 'google-maps-react';
import { GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow } from 'google-maps-react';
import { Marker } from 'google-maps-react';
import myAdd from './add-diner.component.js';



//import CurrentLocation from './Map.component';

//map should really be set relative to parent elements
//in style.css, but I eyeballed it on my screen to look
//somewhat lined up
//TODO (Kris): align the map based on parent element in css
const mapStyles = {
  width: '57.8%',
  height: '80%',
  position: 'relative',
};

//https://developers.google.com/maps/documentation/javascript/style-reference
//^^used google developer to find all the possible elements and features that
//were available for edit and how they could be edited

//https://mapstyle.withgoogle.com/
//^^used mapstyle to generate a template for how to edit features on map
const styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fbbb75"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#47ab33"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#76e82a"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#5c9934"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b8675f"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

//component to display the google map
export class DinersList extends Component {
  constructor(props) {
    super(props);
    this.state = {diners: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  //method to retrieve data from the DB in order to fill in the 
  //map with markers using coordinates

  //returns list of diners with fields:
  //username: String
  //dinerName: String
  //description: String
  //latitude: String
  //longitude: String
  componentDidMount(){
    axios.get('http://localhost:5000/diners')
    .then(response => {
      this.setState({ diners: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
/*
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
*/
  //show info window when user clicks on a marker
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  //if info window is closed reset the state
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  //method to iterate over the corrdinates recieved from the DB
  //and place markers on the map. markers have just been placed 
  //manually
  displayMarkers = () => {
    return this.state.diners.map((diner, index) => {
      return <Marker key={index} id={index} position={{
       lat: diner.latitude,
       lng: diner.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {

    return (

      <Map
      google={this.props.google}
      zoom={14}
      style={mapStyles}
      styles={styles}
      initialCenter={{ 
        lat: 45.5127,
        lng: -122.6795
      }}
    >
      <Marker 
        position = 
        {{ lat: 45.431, lng: -122.374}} 
        onClick={this.onMarkerClick} 
        name ={'Backroads Pub & Grub'} 
      />
 
      <Marker 
        position = 
        {{ lat: 45.522, lng: -122.682}} 
        onClick={this.onMarkerClick} 
        name ={'The Roxy'} 
      />

      <Marker 
        position = 
        {{ lat: 45.529, lng: -122.689}} 
        onClick={this.onMarkerClick} 
        name ={'Salt & Straw'} 
      />

      <Marker 
        position = 
        {{ lat: 45.560, lng: -122.924}} 
        onClick={this.onMarkerClick} 
        name ={'Topgolf'} 
      />

      <Marker 
        position = 
        {{ lat: 45.503, lng: -122.675}} 
        onClick={this.onMarkerClick} 
        name ={'Ascendant Beer Company'} 
      />

      <Marker 
        position = 
        {{ lat: 45.505, lng: -122.632}} 
        onClick={this.onMarkerClick} 
        name ={'Pok Pok'} 
      />

      <Marker 
        position = 
        {{ lat: 45.494, lng: -122.669}} 
        onClick={this.onMarkerClick} 
        name ={'The Old Spaghetti Factory'} 
      />

      <Marker 
        position = 
        {{ lat: 45.481, lng: -122.677}} 
        onClick={this.onMarkerClick} 
        name ={'JoLa Cafe'} 
      />

      <Marker 
        position = 
        {{ lat: 45.473, lng: -122.672}} 
        onClick={this.onMarkerClick} 
        name ={'Szechuan Chef'} 
      />

      <Marker 
        position = 
        {{ lat: 45.470, lng: -122.732}} 
        onClick={this.onMarkerClick} 
        name ={'Maplewood Coffee & Tea'} 
      />

      <Marker 
        position = 
        {{ lat: 45.528, lng: -122.698}} 
        onClick={this.onMarkerClick} 
        name ={'Papa Haydn'} 
      />

      <Marker 
        position = 
        {{ lat: 45.546, lng: -122.711}} 
        onClick={this.onMarkerClick} 
        name ={'Domino Pizza'} 
      />

      <Marker 
        position = 
        {{ lat: 45.488, lng: -122.812}} 
        onClick={this.onMarkerClick} 
        name ={'Pietro Pizza Beaverton'} 
      />

      <Marker 
        position = 
        {{ lat: 45.492, lng: -122.810}} 
        onClick={this.onMarkerClick} 
        name ={'The Westgate Bourbon Bar & Taphouse'} 
      />

      <Marker 
        position = 
        {{ lat: 45.446, lng: -122.726}} 
        onClick={this.onMarkerClick} 
        name ={'Bullseye Pub'} 
      />

      <Marker 
        position = 
        {{ lat: 45.446, lng: -122.777}} 
        onClick={this.onMarkerClick} 
        name ={'Thirsty Lion Gastropub and Grill'} 
      />

      <Marker 
        position = 
        {{ lat: 45.437, lng: -122.827}} 
        onClick={this.onMarkerClick} 
        name ={'Five Guys'} 
      />

      <Marker 
        position = 
        {{ lat: 45.374, lng: -122.912}} 
        onClick={this.onMarkerClick} 
        name ={'Alloro Vineyard'} 
      />

      <Marker 
        position = 
        {{ lat: 45.428, lng: -122.321}} 
        onClick={this.onMarkerClick} 
        name ={'Backroads Pub & Grub'} 
      />

      <Marker 
        position = 
        {{ lat: 45.509472, lng: -122.682616}} 
        onClick={this.onMarkerClick} 
        name ={'Duck House Chinese'} 
      />

      <Marker 
        position = 
        {{ lat: myAdd.lat, lng: myAdd.lng}} 
        onClick={this.onMarkerClick} 
        name ={'Test'} 
      />

      <Marker 
        onClick={this.onMarkerClick} 
        name ={'Portland Oregon'} 
      />

      

      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >

       <div>
          <h4>{this.state.selectedPlace.name}</h4>
        </div>

      </InfoWindow>

   
        </Map>
    );
  }
}

//changing: 1.taking out state, place state in constructor, comment out state
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB5gNUHXaTffk3vGkJeRqEUwGhcgzDUgz0'
}) (DinersList);


