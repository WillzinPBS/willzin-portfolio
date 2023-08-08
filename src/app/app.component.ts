import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AppAngular';

  isFixedNavbar = false;
  mobileMenu: any;
  navList: any;
  navLinks: any;
  activeClass: any;

  ngOnInit(): void {
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.navList = document.querySelector('.nav-list');
    this.navLinks = document.querySelectorAll('.nav-list a');
    this.activeClass = 'active';

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link: HTMLElement, index: number) => {
      link.style.animation
        ? (link.style.animation = '')
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const offset =
  //     window.pageYOffset ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop ||
  //     0;
  //   if (offset > 10) {
  //     this.isFixedNavbar = true;
  //   } else {
  //     this.isFixedNavbar = false;
  //   }
  // }
}
