import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SubjectsService } from '../../core/servies/subjects/subjects.service';
import { Observable } from 'rxjs';
import { ISubjects } from '../../shared/interfaces/isubjects';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [RouterLink, TranslatePipe, TranslateModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent  implements OnInit{
private readonly subjectsService = inject(SubjectsService);
readonly translate = inject(TranslateService)
AllSubjects:WritableSignal<ISubjects[]>=signal([]);

ngOnInit(): void {

  this.getAllLimitedSubjects()
}


getAllSubjects():void{

   this.subjectsService.getAllSubjects().subscribe({
    next:(res)=>{
      console.log('subjects',res)
      this.AllSubjects.set(res.subjects)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

getAllLimitedSubjects():void{

   this.subjectsService.getAllLimitedSubjects().subscribe({
    next:(res)=>{
      console.log('Limitsubjects',res)
      this.AllSubjects.set(res.subjects)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
