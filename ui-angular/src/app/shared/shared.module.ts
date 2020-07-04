import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BasicService,
  IssueService,
  PersonService,
  ProjectService,
  SecurityService
} from './services'

const SERVICES = [
  BasicService,
  IssueService,
  PersonService,
  ProjectService,
  SecurityService
];

const COMPONENTS = [

];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule
  ],
  providers: SERVICES,
  exports: COMPONENTS
})
export class SharedModule { }
