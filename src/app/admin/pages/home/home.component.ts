import { AnimaisService } from './../../../core/services/animais.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private animaisService: AnimaisService) { }

  ngOnInit() {
    this.animaisService.getAll().subscribe(animais => console.log(animais));
  }

}
