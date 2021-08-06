import { Router, ActivatedRoute } from '@angular/router';
import { AnimaisService } from './../../core/services/animais.service';
import { AnimaisInterface } from './../../core/interfaces/animais.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  public animal$: Observable<AnimaisInterface>;

  constructor(private animaisService: AnimaisService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let animalId = params.get("id");
      this.animal$ = this.animaisService.getById(animalId);
    });
  }

}
