import { Component, computed, inject, OnInit, Signal} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService);
  private readonly _myTranslationService = inject(TranslationService);
  private readonly _TranslateService = inject(TranslateService);
  private readonly _CartService = inject(CartService);

  itemNumber: Signal<number> = computed(()=> this._CartService.cartNumber())

  savedlang!: string;

  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        this._CartService.cartNumber.set(res.numOfCartItems);
      },
    });

    

    if (this._TranslateService.currentLang == 'en') {
      this.savedlang = 'عربي';
    } else if (this._TranslateService.currentLang == 'ar') {
      this.savedlang = 'English';
    }
  }

  change(): void {
    if (this._TranslateService.currentLang == 'en') {
      this._myTranslationService.changeLang('ar');
      this.savedlang = 'English';
    } else if (this._TranslateService.currentLang == 'ar') {
      this._myTranslationService.changeLang('en');
      this.savedlang = 'عربي';
    }
  }
}
