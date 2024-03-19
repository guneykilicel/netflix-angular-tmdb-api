import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input({ required: true }) userImg: string = "";
  navList = ["Home","TV Shows","Movies","New & Popular","My List","Browse by Languages"];

  showMenu = false;
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
}
