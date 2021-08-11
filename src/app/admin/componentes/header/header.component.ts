import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponentAdmin implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public sair() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
