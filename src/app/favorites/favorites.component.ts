import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  constructor(
    private sharedService: SharedService,
  ){}

  ngOnInit() {

  }

  async deleteAllFaves(){
    await this.sharedService.clearFaves();
  }

}
