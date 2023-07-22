import { Component, OnInit } from '@angular/core';
import { CurencyService } from './Service/curency.service';
import { curencyResp } from './curency-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  storeData: curencyResp;
  getCurencyValue: FormGroup;
  destinationCurrency: string[];
  isSubmitted: Boolean = false;

  constructor(
    public curencyService: CurencyService,
    public formBuilder: FormBuilder,
  ){
    this.getCurencyForm()
  }

  ngOnInit(): void {
    let initalValue: curencyResp;
    this.curencyService.getRates().subscribe({
      next: (value) => {
        initalValue = value;
      },
      complete: () => {
        this.storeData = initalValue;
        if(initalValue.error !== undefined){
          console.log('error', this.storeData)
          $("#exampleModalLong").modal('show');
        }else{
          const keysArray = [];
          for(const key in initalValue.rates) {
            keysArray.push(key);
          }
          this.destinationCurrency = keysArray;
        }

      },
    })
  }

  submitValue(){
    if(!this.getCurencyValue.valid){
      this.isSubmitted = true;
      return;
    }
    console.log(this.getCurencyValue.value)
  }

  resetForm(){
    this.getCurencyValue.reset();
    this.isSubmitted = false
  }

  getCurencyForm(){
    this.getCurencyValue = this.formBuilder.group({
      amount: ['', [Validators.required]],
      destCurrency: ['', [Validators.required]]
    });
  }

}
