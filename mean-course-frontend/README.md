# MeanCourseFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## String interplotation & event binding & value binding & property reference & ngModel(two way binding)

String interplotation {{nameofTheProperty}}

Property reference can be used in the same html to get the element
<textarea rows=6  [value]="newPost" #postInput></textarea>
It can be passed to the event calls and can be used in ts files like bellow
<button class="btn btn-danger" (click)="onAddPost(postInput)">Submit</button>
And in ts file 
onAddPost(postInput: HTMLTextAreaElement) {
    this.newPost = postInput.value;
  }

Two way data binding
  <textarea rows=6 [(ngModel)]="enteredValue"></textarea>

## To add angular/material using angular cli

ng add @angular/material Which add the material in all the required places
