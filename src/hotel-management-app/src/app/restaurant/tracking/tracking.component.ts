import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map'
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import View from 'ol/View'
import { fromLonLat } from 'ol/proj';
import { Source, TileJSON, Vector } from 'ol/source';
import Layer from 'ol/layer/Layer';
import { Feature, VectorRenderTile, VectorTile } from 'ol';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorContext from 'ol/render/VectorContext';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import BaseVectorLayer from 'ol/layer/BaseVector';


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit{

  

  map:any;
  constructor(){}

  ngOnInit():void {
    this.initializeMap();

  

}

initializeMap(){
  this.map = new Map({
    target: 'map',
    layers: [
      new Tile({
        source: new TileJSON({
          url: 'https://api.maptiler.com/maps/basic-v2/tiles.json?key=gLtavCWBCofyDTWkkoVO ',
          tileSize: 512
        })
      })
    ],
    view: new View({
      center: fromLonLat([77.016675,11.031611]),
      zoom:16
    })
  })

  // const marker = new Feature({
  //   geometry: new Point(fromLonLat([77.016675,11.031611])),
  //   style: new Style({
  //     image: new Icon({
  //       src: 'https://static.vecteezy.com/system/resources/thumbnails/000/573/134/small/vector60-6783-01.jpg',
  //       anchor: [0.5,1]
  //     })
  //   })
  // })

  const marker = new VectorLayer({
    source: new Vector({
      features: [
        new Feature({
          geometry: new Point(fromLonLat([77.016675,11.031611]))

        })
      ]
    }),
    style: new Style({
      image : new Icon({
        src: 'https://play-lh.googleusercontent.com/5WifOWRs00-sCNxCvFNJ22d4xg_NQkAODjmOKuCQqe57SjmDw8S6VOSLkqo6fs4zqis',
        anchor: [0.5,1]
      })
    })
  })

  this.map.addlayer(marker)
}

  // marker = new Feature({
  //   geometry: new Point(fromLonLat([77.016675,11.031611])),
  //   style: new Style({
  //     image: new Icon({
  //       src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png'
  //     })
  //   })
    


  // })

  // this.map.addlayer(marker)

  



}
