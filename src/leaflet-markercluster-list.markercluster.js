/* global L:true */

L.MarkerClusterGroup.WithList = L.MarkerClusterGroup.extend({
  options: {
    // Buffer single addLayer and removeLayer requests for efficiency.
    list: true, // in ms.
  },

  initialize(options) {
    console.log('init');
    L.MarkerClusterGroup.prototype.initialize.call(this, options);
  },

  onAdd(map) {
    console.log('on add');
    this.list = L.markerClusterGroup.list({});
    this.list.addTo(map);

    L.MarkerClusterGroup.prototype.onAdd.call(this, map);
  },
});

L.markerClusterGroup.withList = function (options) {
  return new L.MarkerClusterGroup.WithList(options);
};


L.MarkerCluster.List = L.Control.extend({
  options: {
    position: 'topright',
  },

  onAdd(map) {
    const container = L.DomUtil.create('div', 'markercluster-list leaflet-bar');

    const row = L.DomUtil.create('p', 'marker-cluster-list-row', container);
    row.innerHTML = 'ahoj';


    setTimeout(() => { this.moveContainer(map); }, 100);

    return container;
  },

  _moveContainer(map) {
    const mapDom = map.getContainer();
    const controlDom = this.getContainer();
    mapDom.appendChild(controlDom);
  },

  refreshContent(elements) {
    const rows = elements.map((element, ei) => (`<tr>${ei}</tr>`));


    this.innerHTML = `<table>${rows.join('')}</table>`;
  },

});

L.markerClusterGroup.list = function (options) {
  return new L.MarkerCluster.List(options);
};