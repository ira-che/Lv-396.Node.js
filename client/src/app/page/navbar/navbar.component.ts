import { Component, OnInit, HostListener } from '@angular/core';
import { NavItemsService } from '../common/nav-items.service';
import { UserService } from '../../app_services/user.service';
import { NavItem } from '../common/nav-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private readonly navItemsService: NavItemsService, private readonly userService: UserService) { }
  name: string;
  surname: string;
  avatar: string;
  active: boolean;
  menuList: NavItem[];
  userType: string;

  @HostListener('mouseleave') onMouseLeave() {
    this.active = false;
  }

  ngOnInit() {
    this.navItemsService.getNavList().subscribe(list => this.menuList = list);
    this.userType = this.userService.getUserType();
    this.active = false;
    this.avatar = 'assets/img/navbar-symbol-desk.png';
  }

  currentPage() {
    event.preventDefault();
    this.menuList.map(item => item.current = item.id === 1);
  }

  changeCurrent(i) {
    event.preventDefault();
    this.menuList.map((item, index) => item.current = index === i);
    this.active = false;
  }

  toggleIsActive() {
    event.preventDefault();
    this.active = !this.active;
  }
}
