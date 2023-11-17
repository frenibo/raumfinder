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
        building: 'ZIMT'
      },

      { id: 2,
        name: 'I233',
        floor: 'OG2',
        building: 'ZIMT'
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
        building_name: 'ZIMT',
        building_street: 'Flughafenallee',
        building_number: '10',
        building_ort: 'Bremen',
        building_plz: 28199,
        building_country: 'Deutschland',
        building_image: 'default.jpg',
        floor_ids: [1,2,3],
        room_ids: [1,2],
      },
    ];

    return {rooms, floors, buildings};

  }
}
