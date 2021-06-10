var layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    'heatmap': ['heatmap-opacity']
}

var alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty',
    'full': 'fully'
}

function getLayerPaintType(layer) {
    console.log(layer)
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function(prop) {
        var options = {};
        if (layer.duration) {
            var transitionProp = prop + "-transition";
            options = { "duration": layer.duration };
            map.setPaintProperty(layer.layer, transitionProp, options);
        }
        map.setPaintProperty(layer.layer, prop, layer.opacity, options);
    });
}

var story = document.getElementById('story');
var features = document.createElement('div');
features.setAttribute('id', 'features');

var header = document.createElement('div');

if (config.title) {
    var titleText = document.createElement('h1');
    titleText.innerText = config.title;
    header.appendChild(titleText);
}

if (config.subtitle) {
    var subtitleText = document.createElement('h2');
    subtitleText.innerText = config.subtitle;
    header.appendChild(subtitleText);
}

if (config.byline) {
    var bylineText = document.createElement('p');
    bylineText.innerText = config.byline;
    header.appendChild(bylineText);
}

if (header.innerText.length > 0) {
    header.classList.add(config.theme);
    header.setAttribute('id', 'header');
    story.appendChild(header);
}

config.chapters.forEach((record, idx) => {
    var container = document.createElement('div');
    var chapter = document.createElement('div');

    if (record.title) {
        var title = document.createElement('h3');
        title.innerText = record.title;
        chapter.appendChild(title);
    }

    if (record.image) {
        var image = new Image();
        image.src = record.image;
        chapter.appendChild(image);
    }

    if (record.description) {
        var story = document.createElement('p');
        story.innerHTML = record.description;
        chapter.appendChild(story);
    }

    container.setAttribute('id', record.id);
    container.classList.add('step');
    if (idx === 0) {
        container.classList.add('active');
    }

    chapter.classList.add(config.theme);
    container.appendChild(chapter);
    container.classList.add(alignments[record.alignment] || 'centered');
    if (record.hidden) {
        container.classList.add('hidden');
    }
    features.appendChild(container);
});

story.appendChild(features);

var footer = document.createElement('div');

if (config.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = config.footer;
    footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

mapboxgl.accessToken = config.accessToken;

const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;
    const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";
    return {
      url: url + suffix
    }
}

var map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    interactive: true,
    transformRequest: transformRequest
});

map.scrollZoom.disable();

if (config.showMarkers) {
    var marker = new mapboxgl.Marker({ color: config.markerColor });
    marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// instantiate the scrollama
var scroller = scrollama();

map.on("load", function() {

    map.addControl(new mapboxgl.NavigationControl());

    if (config.use3dTerrain) {
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://styles/mapbox/light-v10',
            'tileSize': 512,
            'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // add a sky layer that will show when the map is highly pitched
        map.addLayer({
            'id': 'sky',
            'type': 'sky',
            'paint': {
                'sky-type': 'atmosphere',
                'sky-atmosphere-sun': [0.0, 0.0],
                'sky-atmosphere-sun-intensity': 15
            }
        });
    };

    // setup the instance, pass callback functions
    scroller
    .setup({
        step: '.step',
        offset: 0.5,
        progress: true
    })
    .onStepEnter(response => {
        var chapter = config.chapters.find(chap => chap.id === response.element.id);
        response.element.classList.add('active');
        if (chapter.flyAnimation) {
            map[chapter.mapAnimation || 'flyTo'](chapter.location);
        }
        if (config.showMarkers) {
            marker.setLngLat(chapter.location.center);
        }
        if (chapter.onChapterEnter.length > 0) {
            chapter.onChapterEnter.forEach(setLayerOpacity);
        }
        if (chapter.callback) {
            window[chapter.callback]();
        }
        if (chapter.rotateAnimation) {
            map.once('moveend', function() {
                const rotateNumber = map.getBearing();
                map.rotateTo(rotateNumber + 90, {
                    duration: 24000, easing: function (t) {
                        return t;
                    }
                });
            });
        }
        // if (chapter.id == "02_bis_bis") {

        // }
    })
    .onStepExit(response => {
        var chapter = config.chapters.find(chap => chap.id === response.element.id);
        response.element.classList.remove('active');
        if (chapter.onChapterExit.length > 0) {
            chapter.onChapterExit.forEach(setLayerOpacity);
        }
    });


    //START add custom layers

    var layers = map.getStyle().layers;
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }

    map.addSource('communes_3000', {
        type: 'geojson',
        data: './data/layers/communes_3000.geojson'
    });
    map.addLayer({
        'id': 'communes_3000',
        'type': 'fill',
        'source': 'communes_3000',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#ff9409', //#ff9101
            //'fill-outline-color': '#d1d1d1',
            'fill-opacity': 0
        }
    },firstSymbolId);

    map.addSource('communes_1500_UUparis', {
        type: 'geojson',
        data: './data/layers/communes_1500_UUparis.geojson'
    });
    map.addLayer({
        'id': 'communes_1500_UUparis',
        'type': 'fill',
        'source': 'communes_1500_UUparis',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#ffcb47', // #fff701
            //'fill-outline-color': '#d1d1d1',
            'fill-opacity': 0
        }
    },firstSymbolId);


    map.addSource('communes_15000', {
        type: 'geojson',
        data: './data/layers/communes_15000.geojson'
    });
    map.addLayer({
        'id': 'communes_15000',
        'type': 'fill',
        'source': 'communes_15000',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#e20016', //#ff9101
            //'fill-outline-color': '#d1d1d1',
            'fill-opacity': 0
        }
    },firstSymbolId);


    map.addSource('UUparis_2020', {
        type: 'geojson',
        data: './data/layers/UUparis_2020.geojson'
    });
    map.addLayer({
        'id': 'UUparis_2020',
        'type': 'line',
        'source': 'UUparis_2020',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'line-color': 'black', //#808080
            'line-width': 1,
            'line-opacity': 0
        }
    },firstSymbolId);

    map.addSource('epci_50000and15000', {
        type: 'geojson',
        data: './data/layers/epci_50000and15000.geojson'
    });
    map.addLayer({
        'id': 'epci_50000and15000',
        'type': 'fill',
        'source': 'epci_50000and15000',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#ffa825', //#ff9101
            //'fill-outline-color': '#d1d1d1',
            'fill-opacity': 0
        }
    },firstSymbolId);

    map.addSource('uu_50000and15000', {
        type: 'geojson',
        data: './data/layers/uu_50000and15000.geojson'
    });
    map.addLayer({
        'id': 'uu_50000and15000',
        'type': 'fill',
        'source': 'uu_50000and15000',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#ffa825', //#ff9101
            //'fill-outline-color': '#d1d1d1',
            'fill-opacity': 0
        }
    },firstSymbolId);



    map.addSource('epci_sru_20pct', {
        type: 'geojson',
        data: './data/layers/epci_sru_20pct.geojson'
    });
    map.addLayer({
        'id': 'epci_sru_20pct',
        'type': 'fill',
        'source': 'epci_sru_20pct',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#FFE373',
            'fill-opacity': 0
        }
    },firstSymbolId);

    map.addSource('uu_sru_20pct', {
        type: 'geojson',
        data: './data/layers/uu_sru_20pct.geojson'
    });
    map.addLayer({
        'id': 'uu_sru_20pct',
        'type': 'fill',
        'source': 'uu_sru_20pct',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#FFE373',
            'fill-opacity': 0
        }
    },firstSymbolId);


    map.addSource('EPCI', {
        type: 'geojson',
        data: './data/layers/epci.geojson'
    });
    map.addLayer({
        'id': 'EPCI',
        'type': 'line',
        'source': 'EPCI',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'line-color': 'black', //#808080
            'line-width': 0.2,
            'line-opacity': 0
        }
    });

    map.addSource('UU', {
        type: 'geojson',
        data: './data/layers/UU.geojson'
    });
    map.addLayer({
        'id': 'UU',
        'type': 'line',
        'source': 'UU',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': 'black', //#808080
            'line-width': 0.6,
            'line-opacity': 0
        }
    });


    map.addSource('EPCI_UU_mask', {
        type: 'geojson',
        data: './data/layers/EPCI_UU_mask.geojson'
    });
    // map.addLayer({
    //     'id': 'EPCI_UU_mask',
    //     'type': 'fill',
    //     'source': 'EPCI_UU_mask',
    //     'layout': {
    //         'visibility': 'visible'
    //     },
    //     'paint': {
    //         'fill-color': 'black', //#f4f4f2
    //         'fill-opacity': 0
    //     }
    // });

    
    map.loadImage(
        './data/img/pattern_cross_05.png',
        function (err, image) {
            // Throw an error if something went wrong
            if (err) throw err;

            // Declare the image
            map.addImage('pattern', image);

            // Use it
            map.addLayer({
                'id': 'EPCI_UU_mask',
                'type': 'fill',
                'source': 'EPCI_UU_mask',
                'paint': {
                    'fill-pattern': 'pattern',
                    'fill-opacity': 0,
                    'fill-outline-color': 'black'
                }
            },firstSymbolId);
        }
    );

    //END add custom layers



    //START Horrible hack to handle multiple switch toggle checkboxes display and animation
    var checkboxes = document.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function(event){

            var epci = document.getElementsByClassName("epci");
            var uu = document.getElementsByClassName("uu");

            if (event.target.checked) {
                map.setLayoutProperty('EPCI','visibility','none');
                map.setLayoutProperty('UU','visibility','visible');
                for(var i=0; i<epci.length; i++) {
                    checkboxes[i].checked = true;
                    epci[i].style.color = 'grey';
                    uu[i].style.color = 'white';
                }
                map.setLayoutProperty('epci_50000and15000','visibility','none');
                map.setLayoutProperty('epci_sru_20pct','visibility','none');
                map.setLayoutProperty('uu_50000and15000','visibility','visible');
                map.setLayoutProperty('uu_sru_20pct','visibility','visible');
            }
            else {
                map.setLayoutProperty('UU','visibility','none');
                map.setLayoutProperty('EPCI','visibility','visible');
                for(var i=0; i<epci.length; i++) {
                    checkboxes[i].checked = false;
                    epci[i].style.color = 'white';
                    uu[i].style.color = 'grey';
                }
                map.setLayoutProperty('uu_50000and15000','visibility','none');
                map.setLayoutProperty('uu_sru_20pct','visibility','none');
                map.setLayoutProperty('epci_50000and15000','visibility','visible');
                map.setLayoutProperty('epci_sru_20pct','visibility','visible');
            }
        })
    })
    //END Horrible hack to handle multiple switch toggle checkboxes display and animation

});

// setup resize event
window.addEventListener('resize', scroller.resize);