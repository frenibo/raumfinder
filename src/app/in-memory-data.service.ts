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
        room_number: 'I032',
        room_image: 'default.jpg',
        floor_id: '1',
        building_id: '1'
      },
    ];

    const floors = [
      { id: 1,
        floor_number: 1,
        floor_image: 'default.jpg',
        building_id: 1,
        room_ids: [1,2],
      },
    ];

    const buildings = [
      { id: 1,
        building_streetname: 'streetname',
        building_number: '1a',
        building_ort: 'ort',
        building_plz: 123456,
        building_country: 'Land',
        building_image: 'default.jpg',
        floor_ids: [1,2],
        room_ids: [1,2],
      },
    ];

    return {rooms, floors, buildings};

  }
}
