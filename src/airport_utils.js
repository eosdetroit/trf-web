import airports from './data/us_airports.json';

export const queryMatch = query => {
  if (!query) {
    return [];
  }
  const sanitizedQuery = query.toLowerCase()
                              .replace(/[^\w\s]|_/g, "")
                              .replace(/\s+/g, " ");

  const matches = field => {
    return Boolean(field.toLowerCase().match(new RegExp("^" + sanitizedQuery)));
  };

  const calculateScore = airport => {
    const searchString = airport.iata + " " + airport.name + " " + airport.city + " " + airport.state;

    let score = 0;
    if (matches(searchString)) score += 1;
    if (matches(airport.iata)) score += 6;
    if (matches(airport.name)) score += 5;
    if (matches(airport.city)) score += 3;
    if (matches(airport.state)) score += 2;
    if (score === 0) return score;

    if (airport.size === "large_airport") score += 10;
    if (airport.size === "medium_airport") score += 3;
    return score;
  };

  const weighted = airports.map((airport) => {
    airport.score = calculateScore(airport);
    return airport;
  });

  return weighted.filter((airport) => {
    return airport.score > 0;
  })
  .sort((b, a) => a.score - b.score)
  .slice(0, 25);
};


export const haversine = (startLat, startLng, endLat, endLng) => {
  const latDiff = (startLat - endLat) * (Math.PI / 180);
  const lngDiff = (startLng - endLng) * (Math.PI / 180);
  const startLatRad = startLat * (Math.PI / 180);
  const endLatRad = endLat * (Math.PI / 180);

  const a = Math.sin(latDiff / 2) * Math.sin(Math.sin(latDiff / 2)) +
                  Math.cos(startLatRad) * Math.cos(endLatRad) *
                  Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2);
  const c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2;
  return (3440 * c).toFixed(2);
};

/*
export const createTrip = (start, end) => {
  const startLatLng = new google.maps.LatLng(start.lat, start.lng);
  const endLatLng = new google.maps.LatLng(end.lat, end.lng);

// Setting markers
  if (window.Map.markers) {
    window.Map.markers.forEach((marker) => {
      marker.setMap(null);
    });
  }
  const startMarker = new google.maps.Marker({
    position: startLatLng,
    map: window.Map.map,
    title: start.name,
    label: "A",
    animation: google.maps.Animation.DROP
  });
  const endMarker = new google.maps.Marker({
    position: endLatLng,
    map: window.Map.map,
    title: end.name,
    label: "B",
    animation: google.maps.Animation.DROP
  });
  window.Map.markers = [startMarker, endMarker];

// Drawing the polyline
  if (window.Map.path) {
    window.Map.path.setMap(null);
  }
  const path = new google.maps.Polyline({
    geodesic: true,
    path: [startLatLng, endLatLng],
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  window.Map.path = path;
  path.setMap(window.Map.map);

// Resetting bounds
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(startLatLng);
  bounds.extend(endLatLng);
  window.Map.map.fitBounds(bounds);
};
*/

export const airportString = airport => {
  return airport.iata + " - " + airport.name + ", " + airport.city + ", " + airport.state;
};

export const manageScrollView = () =>  {
  const item = document.getElementsByClassName('selected')[0];
  if (!item) return;
  const list = item.parentNode;
  const offset = item.offsetTop;
  if (offset >= list.clientHeight + list.scrollTop - item.clientHeight) {
    list.scrollTop = offset - list.clientHeight + item.clientHeight;
  }
  if (offset < list.scrollTop) list.scrollTop = offset;
};
