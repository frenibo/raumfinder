import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Room } from './room';
import { Floor } from './floor';
import { Building } from './building';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const rooms = [
      { id: 1,
        name: 'I032',
        floor: 'EG',
        building: 'ZIMT',
        favorite: false,
      },

      { id: 2,
        name: 'I233',
        floor: 'OG2',
        building: 'ZIMT',
        favorite: false,
      },

      { id: 3,
        name: 'A003',
        floor: 'EG',
        building: 'AB-Gebäude',
        favorite: false,
      },
    ];

    const floors = [
      { id: 1,
        name: 'EG',
        image: 'default.jpg',
        building_id: 1,
        room_ids: [1,2],
      },
      { id: 2,
        name: 'OG1',
        image: 'default.jpg',
        building_id: 1,
        room_ids: [1,2],
      },
      { id: 3,
        name: 'OG2',
        image: 'default.jpg',
        building_id: 1,
        room_ids: [1,2],
      },
    ];

    const buildings = [
      { 
        id: 1,
        name: 'ZIMT',
        street: 'Flughafenallee',
        street_number: '10',
        ort: 'Bremen',
        plz: 28199,
        country: 'Deutschland',
        image: 'default.jpg',
        floor_ids: [1,2,3],
        room_ids: [1,2],
        favorite: false,
      },
    ];

    return {rooms, floors, buildings};

  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  /*
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  */

  genId(objects: any[]): number {
    return objects.length > 0 ? Math.max(...objects.map(object => object.id)) + 1 : 1;
  }
}
