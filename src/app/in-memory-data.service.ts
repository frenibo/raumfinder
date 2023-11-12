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
      { id: 12, ownerid: 12, privacy: 'restricted', name: 'Dr. Nice',   
        date: '2023-08-18T10:44:34.421Z', image: 'assets/topology_images/default.jpg',
        description: 'This text is a brief comment by the author describing the purpose and contents of the topology.',
      },
    ];

    const floors = [
      { id: 0,  name: 'Guest',    forename: 'Guest',      surname: '',           
        email: '',               password: '',         image: 'assets/user_images/default.png'
      },
    ];

    const buildings = [
      { id: 0,  name: 'Guest',    forename: 'Guest',      surname: '',           
        email: '',               password: '',         image: 'assets/user_images/default.png'
      },
    ];

    return {rooms, floors, buildings};

  }
}
