import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent implements OnInit {
  private readonly _TranslateService=inject(TranslateService)
  private readonly _myTranslationService=inject(TranslationService)


  savedlang!: string;


  ngOnInit(): void {
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
