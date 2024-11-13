import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {DynamicInputComponent} from "./dynamic-input/dynamic-input.component";
import {DynamicSelectComponent} from "./dynamic-select/dynamic-select.component";
import {DynamicRadioComponent} from "./dynamic-radio/dynamic-radio.component";
import {DynamicCheckboxsComponent} from "./dynamic-checkboxs/dynamic-checkboxs.component";

@Component({
  selector: "app-field-input",
  templateUrl: "./dynamic-field.component.html",
  styleUrls: ["./dynamic-field.component.css"],
})
export class DynamicFieldComponent implements AfterViewInit{

  supportedDynamicComponents = [
    {
      name: 'text',
      component: DynamicInputComponent
    },
    {
      name: 'number',
      component: DynamicInputComponent
    },
    {
      name: 'select',
      component: DynamicSelectComponent
    },
    {
      name: 'radio',
      component: DynamicRadioComponent
    },
    {
      name: 'date',
      component: DynamicInputComponent
    },
    {
      name: 'checkbox',
      component: DynamicCheckboxsComponent
    }
  ]
  @ViewChild('dynamicInputContainer', { read: ViewContainerRef}) dynamicInputContainer!: ViewContainerRef;
  @Input() field: any;
  formName: FormGroup;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.registerDynamicField();
  }

  private registerDynamicField() {
    this.dynamicInputContainer.clear();
    if(Array?.isArray(this.field)){
      this.field.map((itm:any)=>{
        const componentInstance = this.getComponentByType(itm._template ? itm._template?.type : itm?.type);
        if(componentInstance){
          console.log("tyty",itm._template ? itm._template?.type : itm?.type)
          const dynamicComponent = this.dynamicInputContainer.createComponent(componentInstance)
          dynamicComponent.setInput('field', itm);
          this.cd.detectChanges();
        }
      })
     
    }
    else{
      const componentInstance = this.getComponentByType(this.field._template ? this.field._template?.type : this.field?.type)
      if(componentInstance){
        console.log("fewfwe",this.field._template ? this.field._template?.type : this.field?.type)
        const dynamicComponent = this.dynamicInputContainer.createComponent(componentInstance)
        dynamicComponent.setInput('field', this.field);
        this.cd.detectChanges();
      }
 
    }

    console.log(this.field)
  }

  getComponentByType(type: string): any {
    let componentDynamic = this.supportedDynamicComponents.find(c => c.name === type);
    return componentDynamic ? componentDynamic.component || DynamicInputComponent : null;
  }

}
