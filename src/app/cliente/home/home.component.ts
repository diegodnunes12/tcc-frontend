import { Observable } from 'rxjs';
import { AnimaisInterface } from './../../core/interfaces/animais.interface';
import { AnimaisService } from './../../core/services/animais.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public animais$: Observable<AnimaisInterface[]>;

  constructor(private animaisService: AnimaisService) { }

  ngOnInit(): void {
    this.animais$ = this.animaisService.getAll();
  }

}
