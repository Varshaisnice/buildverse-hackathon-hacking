
// This loader is automatically injected by App.tsx using the loadGoogleMapsScript utility
// It adds a Google Maps stub that allows the app to work even without an API key
window.google = window.google || {};
window.google.maps = window.google.maps || {
  Map: function(el, options) {
    // Create a simple styled map container
    if (el) {
      el.innerHTML = `
        <div style="height:100%; display:flex; align-items:center; justify-content:center; flex-direction:column; background:#f0f4f8;">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:1rem">
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path>
          </svg>
          <h3 style="font-size:1.25rem; font-weight:600; margin:0 0 0.5rem 0">Map View</h3>
          <p style="margin:0; color:#64748b; text-align:center; max-width:80%">
            Showing approximate locations of reported missing children
          </p>
        </div>
      `;
    }
    
    this.el = el;
    this.options = options || {};
    this.markers = [];
    
    return this;
  },
  LatLng: function(lat, lng) {
    return { lat: lat, lng: lng };
  },
  Marker: function(options) {
    this.options = options || {};
    this.position = options.position;
    this.title = options.title;
    this.map = options.map;
    
    if (this.map && this.map.markers) {
      this.map.markers.push(this);
    }
    
    this.addListener = function(event, callback) {
      // Store the callback for potential use
      this['on' + event] = callback;
    };
    
    return this;
  },
  InfoWindow: function(options) {
    this.options = options || {};
    this.content = options.content || '';
    
    this.open = function(map, marker) {
      console.log('InfoWindow opened with content:', this.content);
    };
    
    return this;
  },
  places: {},
  drawing: {},
  geometry: {},
  visualization: {}
};
