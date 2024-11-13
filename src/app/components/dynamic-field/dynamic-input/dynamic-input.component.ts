import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";

@Component({
  selector: "app-dynamic-input",
  templateUrl: "./dynamic-input.component.html",
  styleUrls: ["./dynamic-input.component.css"],
})
export class DynamicInputComponent {
  @Input() field: any;
  formName: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {
    console.log(formgroupDirective.control)
    this.formName = formgroupDirective.control;
  }

  getChild(field:any){
    // Object.keys(field).map((itm:any)=>{

    // })
    // console.log(field?.childKeyName)
    console.log(Object.entries(field))
    return  Object.entries(field);
  }

  checkIfArray(field:any){
    return Array.isArray(field)
  }
}
