import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface DropdownItem {
  route: string;
  label: string;
}

interface NavItem {
  route?: string;
  label: string;
  delayClass: string;
  external?: boolean;
  dropdownItems?: DropdownItem[];
}

interface SocialItem {
  href: string;
  label: string;
  iconClass: string;
  hoverColorClass: string;
  delayClass: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isMobileDropdownOpen = signal(false);

  readonly navItems: NavItem[] = [
    {
      route: '/corporativo',
      label: 'Corporativo',
      delayClass: 'animation-delay-100',
    },
    {
      label: 'Productos y servicios',
      delayClass: 'animation-delay-200',
      dropdownItems: [
        { route: '/puertas-rapidas', label: 'Puertas rápidas' },
        { route: '/plataformas-niveladoras', label: 'Plataformas' },
        { route: '/puertas-seccionales', label: 'Puertas seccionales' },
        { route: '/abrigos', label: 'Abrigos' },
        { route: '/docking-before-opening', label: 'Docking before opening' },
        { route: '/loading-houses', label: 'Loading houses' },
        { route: '/protecciones', label: 'Protecciones' },
        { route: '/puertas-especializadas', label: 'Puertas Especializadas' },
        { route: '/puertas-metalicas', label: 'Puertas metálicas' },
        { route: '/cortinas-de-aire', label: 'Cortinas de aire' },
      ],
    },
    {
      route: '/casos-exito',
      label: 'Casos de éxito',
      delayClass: 'animation-delay-300',
    },
    // {
    //   route: '#',
    //   // route: '/multimedia',
    //   label: 'Multimedia',
    //   delayClass: 'animation-delay-400',
    // },
    {
      route: 'https://refridcol.com/linea-etica/',
      label: 'Línea Ética',
      delayClass: 'animation-delay-500',
      external: true,
    },
  ];

  readonly socialItems: SocialItem[] = [
    {
      href: 'https://www.facebook.com/Yaklogistica/',
      label: 'Facebook',
      iconClass: 'bi bi-facebook text-3xl',
      hoverColorClass: 'hover:text-[#1877F2]',
      delayClass: 'animation-delay-600',
    },
    {
      href: 'https://www.instagram.com/yaklogistica/',
      label: 'Instagram',
      iconClass: 'bi bi-instagram text-3xl',
      hoverColorClass: 'hover:text-[#E1306C]',
      delayClass: 'animation-delay-700',
    },
    {
      href: 'https://www.linkedin.com/company/yaklogistica/',
      label: 'LinkedIn',
      iconClass: 'bi bi-linkedin text-3xl',
      hoverColorClass: 'hover:text-[#0A66C2]',
      delayClass: 'animation-delay-800',
    },
    {
      href: 'https://www.youtube.com/@yaklogisticaindustrial3531',
      label: 'YouTube',
      iconClass: 'bi bi-youtube text-3xl',
      hoverColorClass: 'hover:text-[#FF0000]',
      delayClass: 'animation-delay-900',
    },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > window.innerHeight * 0.5);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
    if (!this.isMobileMenuOpen()) {
      this.isMobileDropdownOpen.set(false);
    }
  }

  toggleMobileDropdown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isMobileDropdownOpen.update((v) => !v);
  }
}
