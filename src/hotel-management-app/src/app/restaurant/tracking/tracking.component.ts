// import { Component, OnInit } from '@angular/core';
// import Map from 'ol/Map'
// import Tile  from 'ol/layer/Tile'
// import OSM from 'ol/source/OSM'
// import View from 'ol/View'
// import { fromLonLat } from 'ol/proj';
// import { Source, TileJSON, Vector } from 'ol/source';
// import Layer from 'ol/layer/Layer';
// import { Feature, VectorRenderTile, VectorTile } from 'ol';
// import { Point } from 'ol/geom';
// import Style from 'ol/style/Style';
// import Icon from 'ol/style/Icon';
// import VectorImageLayer from 'ol/layer/VectorImage';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
// import {Modify} from 'ol/interaction.js';
// import {OGCMapTile, Vector as VectorSource} from 'ol/source.js';




// @Component({
//   selector: 'app-tracking',
//   templateUrl: './tracking.component.html',
//   styleUrl: './tracking.component.css'
// })
// export class TrackingComponent implements OnInit{

  

//   map:any;
//   constructor(){}

//   ngOnInit():void {
//     this.initializeMap();

  

// }

// initializeMap(){
//   const iconFeature = new Feature({
//     geometry: new Point(fromLonLat([77.016675,11.031611])),
//     name: 'Null Island',
//     population: 4000,
//     rainfall: 500,
//   });

//   const iconStyle = new Style({
//     image: new Icon({
//       anchor: [0.5, 1],
//       height: 20,
//       width: 20,


//       src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAolBMVEX///9xswAAAABssQBqsABytQB1tgD2+u5ppwD+//tztwD///3O5Kzq9Nnc7MRnrgAvSgBGbwAeMAD6/fTy+OZajwBKdQAhNAB+uh9trQDu9uDY6r3i78uEvSrG4KOkzWuPw0SFvTSw1Hnn8tOfy12925G32INRgQA7XgA0UgAGCgBloAAKEAArRABgmAAUHwCjzWK62YpWiQCayVA2VgDE35rXk8q2AAAHJUlEQVR4nO2da1fiPBDHLWlabqUqoCAgFMRVWV1c3O//1R5KubTQdqY0PZPkye/N7itP/mfSuWUSbm4MBoPBYDAYDAaDwWAwGAwGzej2vEUnZOH1utSLEYzrjb7Xs4njWH6I5TiT2fp75LnUCxNCw3ueBpZvM2bFYcz2rWD67DWoF1iOxngeMDupLaHTZsF8rK7Ip2XAWLa8gzFZsHyiXupVeFPHh+QdLOlMvRb1eosyegGtl7TkZqSUxkUxfXuNC+plo3HnVlF9kcapGuGj0XbsK/SF2E5bAb/69HKN/Y523HjUAiA6ThmBW4nOiFpCLo1Xv5S+EP9V4p3qbsoZcG/GjbQOpze71sUksWc9ainpLAYiLBjCBlKGRnECJZXoTcQJ3EqcSBc1ekIFhhIl+xbdQKzAUKJUHrU1FS1wK3EtU1xcigkTSewltawTI/EWDGHSJHA9gXEioXAgi7eZVrFHdxKn1NIiRlUJ3H6KUuxTV3AkjCNHyHitzoRbI75Sy9vW9E6FAi3LoW+lzqs04daIc2qBFZtQAiNW+hWGUH+JT4Miq+Vn/6IY0BqxSELabFrDesgw/C8a2vS0hY6FnNd/vT3WIh7fftU51pBsQnmg0UEK5Fb//aMW5+O9j92srEOoEJeR8ubqtnbJ7aqJ0mgTZqctlJ/h/CFFX8gDbqsO6ErhMWaT8vp7hsBa7b2OkcjGZAr/ITYprz9mCtz6HIxE+x+ZQswx0zBP4FbiEJbIXqgE9uDPkFtpPibhbxAulazWH8MWzHQyJx4Q+5TqQ2yDnyFf/QYV/l6BEu02kUK4cGp+ggJrtU8whSMrocDTQv6FEFirfUFGZBsaga0ANOEbSuEbaMSAJjV1QVc6/INS+GcI/aEBTUMKLO95HyWwVutD25So0F+ACu+QCu9AhTQHprBCKNofuJVU4QhYlmXlJ2wnHsG/RNP7hhRy6x6p8B7M3IxC9RXSNDJATyPuOzS+tCLgiC8uHtJEfDBrE5fTEGVtLXCGRlReyogy75s1pBBZW/xAtQVb0wiEDy1E1Yf2N5FCeIxGUI1PNljjgQUiX32AAj/gPs2AalCxMQONiAgYYKiw2IysrQ8fAMP90k/oT5AeAy/gnjcX0fOmGxjuIsYUBJxbOIR3ajEHF7ye7VA/MQLpji1ukGfA3MpyN3eoY2DSM+Au7oi0+ZVmxs8v3BnwgPTi9zduFoNb/XOfevsXeY5PltBEeMiRKM55/eHnUPPf/zzUOXYYwyG+l1BgrK3Jh/VV/29/VR9y/DwN5ZzCDkRIPMFDW25tV2QmijAY7il1oRIhkDJURCAOgktBN4dxRMidwyyoTg4TVGtECUxY6ZQw/YTwjl51Y8LkA8J7llV9iUyWm08N4Vfz9gIDaW6vYcdMiyqkLCrOqMTZSOJmIqq4GSTHjaAjFdxAlOf2YcRa9D61qTr5WYjep5Lt0RDB+1S2PRoi1J9K5UcPNATuUzaRJtbHGYvLTx0pSopLhN3Kl+kmfoKGoGKYbaTcoyGumH3qSBcoTrSFKKSaW0ch4PEB8gZpPt3SpSILJH+ftlCHOFUheQcYomTIkDZQnCgXMiQOFCfgGZQcyOZKCgFfh8qE7IJTQa4OGZIHihPule9fMpmTmSTwPYV0JKx6s7jqtQwpq94srnmgTsLOTB5XvB0lx5tQeMD54QsTytY9hEDc804izdtsaJ6LGZE9Uy+4MK1CQxrsRak35yO8IlMzXIl89JwCyZsy6VqSAuf7jnJuJgLz9MkORvd4STmwmQ0LlMpm4iArRVWqwhTgu1+RCRWMFAfaKIXqmhA5B047x10WhDslfAVKBIgEXL2UOwlY7VO/bVkaD7ShkhlpHKDEkGCOuyzAFIqMUyUFAQKG2qEiItfXKO9nQha5NpT+tBBDzm1hNqNenBByKgxbvf5TGjm1vqq1/TmZP9Eiy687lGactU1tiUbVS5H5zAvRoywVME/fpkyl47R8Ml5Uluk+RUncSapCtQ4M80mdkFbqzBdinPbTlr6kg8BX0U3bphMNyooTKQWGFmXFicXlNtVqk6bWwTrUvnEuclNtctIDF/19pXv5aVyUULoUTkfOB2uVGJUtxtl0tALTzkVZnCnUogWV4Cyt0SuhiUjEC+1iRUg7ntb4usWKEDf+IdoalYZH4mMLSg8nZPMaU6hXXXEglrhpl7JF9E7Dily3lC2iezyiYTMNo2HIsW2qUaM0yXEwWsGRZxynuQz9ktKIY2qqUys4QWM/ecJetKsND+xrRA1rwwOjKPn21Z+hyaK3V6hnvN8RtaMc6mVUyK4dJcV7llWxe1iZ+OnjatllNdpmNCG75wc1GEfMprfzNBq70uinBih/CKBywvfAJHqzswq2mamSlynxzG29RjAuWTKd8+6Qf77vq31HBsLtdDo6BwuDwWAwGAwGg8FgMBgMBsP/mP8ACfR35P0O48oAAAAASUVORK5CYII=',
//     }),
//   });
  
//   iconFeature.setStyle(iconStyle);
  
//   const vectorSource = new VectorSource({
//     features: [iconFeature],
//   });
  
//   const vectorLayer = new VectorLayer({
//     source: vectorSource,
//   });
  
//   const rasterLayer = new Tile({
//     source: new TileJSON({
//       url: 'https://api.maptiler.com/maps/basic-v2/tiles.json?key=gLtavCWBCofyDTWkkoVO',
//       tileSize: 512,
//       crossOrigin: '',
//     }),
//   });
  
//   // const target = document.getElementById('map');
//   const map = new Map({
//     layers: [rasterLayer, vectorLayer],
//     target: 'map',
//     view: new View({
//       center: fromLonLat([77.016675,11.031611]),
//       zoom: 16,
//     }),
//   });

//   // new code stops here 





// //   this.map = new Map({
// //     target: 'map',
// //     layers: [
// //       new Tile({
// //         source: new TileJSON({
// //           url: 'https://api.maptiler.com/maps/basic-v2/tiles.json?key=gLtavCWBCofyDTWkkoVO ',
// //           tileSize: 512
// //         })
// //       })
// //     ],
// //     view: new View({
// //       center: fromLonLat([77.016675,11.031611]),
// //       zoom:16
// //     })
// //   })

// //   // const marker = new Feature({
// //   //   geometry: new Point(fromLonLat([77.016675,11.031611])),
// //   //   style: new Style({
// //   //     image: new Icon({
// //   //       src: 'https://static.vecteezy.com/system/resources/thumbnails/000/573/134/small/vector60-6783-01.jpg',
// //   //       anchor: [0.5,1]
// //   //     })
// //   //   })
// //   // })

// //   const marker = new VectorImageLayer({
// //     source: new Vector({
// //       features: [
// //         new Feature({
// //           geometry: new Point(fromLonLat([77.016675,11.031611]))

// //         })
// //       ]
// //     }),
// //     style: new Style({
// //       image : new Icon({
// //         src: 'https://play-lh.googleusercontent.com/5WifOWRs00-sCNxCvFNJ22d4xg_NQkAODjmOKuCQqe57SjmDw8S6VOSLkqo6fs4zqis',
// //         anchor: [0.5,1]
// //       })
// //     })
// //   })

// //   this.map.addlayer(marker)
// }



  



// }






//   // marker = new Feature({
//   //   geometry: new Point(fromLonLat([77.016675,11.031611])),
//   //   style: new Style({
//   //     image: new Icon({
//   //       src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png'
//   //     })
//   //   })
    


//   // })

//   // this.map.addlayer(marker)

import { Component, OnInit, OnDestroy } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import LineString from 'ol/geom/LineString';
import { getVectorContext } from 'ol/render';
import { easeOut } from 'ol/easing';
import { unByKey } from 'ol/Observable';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit, OnDestroy {
  private map!: Map;
  private route!: LineString;
  private position!: Feature;
  private animating: boolean = false;
  private now!: number;
  private speed: number = 50; // Adjust this value to change animation speed
  private moveFeatureHandler: any;

  ngOnInit(): void {
    const start = [2.3522, 48.8566]; // Paris
    const end = [-0.1276, 51.5074];  // London

    const routeCoordinates = [start, end].map(coord => fromLonLat(coord));
    this.route = new LineString(routeCoordinates);

    const routeFeature = new Feature({
      type: 'route',
      geometry: this.route,
    });

    this.position = new Feature({
      type: 'icon',
      geometry: new Point(routeCoordinates[0]),
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      }),
    });

    this.position.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [routeFeature, this.position],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(start),
        zoom: 5,
      }),
    });

    document.getElementById('start-animation')!.addEventListener('click', () => {
      if (this.animating) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    });
  }

  private moveFeature(event: any): void {
    const vectorContext = getVectorContext(event);
    const frameState = event.frameState;

    if (this.animating) {
      const elapsedTime = frameState.time - this.now;
      const index = Math.min(1, this.speed * elapsedTime / 1000);

      const currentCoordinate = this.route.getCoordinateAt(index);
      this.position.setGeometry(new Point(currentCoordinate));

      vectorContext.drawFeature(this.position, this.position.getStyle() as Style);
      this.map.render();
    }
  }

  private startAnimation(): void {
    this.animating = true;
    this.now = new Date().getTime();
    this.moveFeatureHandler = this.moveFeature.bind(this);
    this.map.on('postcompose', this.moveFeatureHandler);
    this.map.render();
  }

  private stopAnimation(): void {
    this.animating = false;
    unByKey(this.moveFeatureHandler);
    this.position.setGeometry(new Point(this.route.getLastCoordinate()));
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }
}
