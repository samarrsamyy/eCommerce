import { Component } from '@angular/core';
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [NavBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
