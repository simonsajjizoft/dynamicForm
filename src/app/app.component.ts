import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  model = {
    packagingdate: [
      {
      _template:{
        type: "date",
        value: "",
        label: "Package Effective Material Date",
        rules: {
          required: true,
        },
      },
      // childKeyName:['packageLevel'],
      packageLevel: [
        {
          _template:{
          type: "text",
          value: "",
          label: "Package Level",
          link:'packageLevel',
          options: [
            {
              label: "Select Packaging Level",
              value: ""
            }
          ],
        },
        // childKeyName:['packageComponentName'],
        // packagingComponentName[0]?._template
        //  packagingComponentName[0]?.packageComponentQuantity._template
        packageComponentName:[
          {
          _template:{
            type: "text",
            value: "",
            label: "Package Component Name",
          },
          // childKeyName:['packageComponentQuantity'],
          packageComponentQuantity:{
              type: "number",
              value: "",
              label: "Package Component Quantity",
          }
        }
      ],
      }
      ],
    }
  ]
    
    
  };
}

