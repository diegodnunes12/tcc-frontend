import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-adotar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderAdotarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public sair() {
    localStorage.removeItem('usuario');
    this.router.navigate(['']);
  }

}
