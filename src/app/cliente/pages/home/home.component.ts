import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimaisInterface } from '../../../core/interfaces/animais.interface';
import { AnimaisService } from '../../../core/services/animais.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public animais$: Observable<AnimaisInterface[]>;

  constructor(private animaisService: AnimaisService, private router: Router) { }

  ngOnInit(): void {
    this.animais$ = this.animaisService.getAll();

    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);

    console.log(decoded);
  }

  public detalhes(animalId: string) {
    this.router.navigate(['adotar', 'detalhes', animalId]);
  }

}
