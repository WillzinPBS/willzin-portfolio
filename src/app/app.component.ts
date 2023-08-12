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
  sections: any;
  activeClass: any;

  idade: any;

  ngOnInit(): void {
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.navList = document.querySelector('.nav-list');
    this.navLinks = document.querySelectorAll('.nav-list a');
    this.sections = document.querySelectorAll('section');
    this.activeClass = 'active';

    this.idade = this.calculateAge(new Date(2003, 5, 9));

    scroll(0, 1);

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

  scrollToSection() {
    if (this.mobileMenu.classList.contains('active')) {
      this.handleClick();
    }
  }

  calculateAge(birthDate: Date): number {
    const currentDate = new Date();
    const differenceInMilliseconds =
      currentDate.getTime() - birthDate.getTime();
    const ageInYears =
      differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(ageInYears);
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    this.sections.forEach((sec: HTMLElement) => {
      let top = window.scrollY;
      let offset = sec.offsetTop;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      if (top >= offset - 160 && top < offset + height) {
        this.navLinks.forEach((links: HTMLElement) => {
          links.classList.remove('active');
          document.querySelector('[href*=' + id + ']')?.classList.add('active');
        });
      }
    });
  }
}
