import { Component, OnInit } from '@angular/core';
import { IScore } from '../shared/models/partitura.interface';
import { IStoredType } from '../shared/models/almacenamiento.interface';
import { PersonaTipo } from '../shared/models/autor.interface';
import { MusicService } from './music.service';
import { Store } from '@ngrx/store';

import * as fromMusic from './music.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.less']
})
export class MusicDetailComponent implements OnInit {
  mockData$: Observable<IScore>;
  constructor(private musicService: MusicService, private store: Store<fromMusic.State>) { }

  ngOnInit() {
    // this.mockData$ = this.store.select(fromMusic.getPartitura);
    // this.mockData$.subscribe(res => console.log(res));
  }

}
