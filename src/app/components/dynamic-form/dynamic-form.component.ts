import {Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.css"],
})
export class DynamicFormComponent implements OnInit {
  @Input() model: {};
  public dynamicFormGroup: FormGroup;
  public fields = [];

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    const formGroupFields = this.getFormControlsFields();
    this.dynamicFormGroup = new FormGroup(formGroupFields);
  }

  private getFormControlsFields() {
    const formGroupFields = {};
    for (const field of Object.keys(this.model)) {
      const fieldProps = this.model[field];
      console.log(fieldProps)

      // const validators = this.addValidator(fieldProps.rules);
      if(Array.isArray(fieldProps)){
        fieldProps.forEach((item:any)=>{
          formGroupFields[field] = new FormControl(item.value);
          this.fields.push({...item, fieldName: field});
        })
      }
      else{
        formGroupFields[field] = new FormControl(fieldProps.value);
        this.fields.push({...fieldProps, fieldName: field});
      }

    }

    return formGroupFields;
  }

  private addValidator(rules) {
    if (!rules) {
      return [];
    }

    const validators = Object.keys(rules).map((rule) => {
      switch (rule) {
        case "required":
          return Validators.required;
          //add more case for future.
      }
    });
    return validators;
  }
}
