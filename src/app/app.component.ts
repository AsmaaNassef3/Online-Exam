import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from './core/servies/flowbite/flowbite.service';
import { NgxSpinnerComponent } from 'ngx-spinner';


 @Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerComponent],
  styleUrls: [],  // ✅ لو مش هتستخدم أي ستايلات
  templateUrl: './app.component.html',
})


export class AppComponent {
 constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
    console.log(flowbite);
    });
  }
}
