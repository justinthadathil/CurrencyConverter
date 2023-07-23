import { Component, OnInit } from '@angular/core';
import { CurencyService } from './Service/curency.service';
import { curencyModel } from './curency-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  storeData: curencyModel;
  getCurencyValue: FormGroup;
  destinationCurrency: string[];
  isSubmitted: Boolean = false;
  serverError: Boolean = false;
  finalText: string = '';

  memberAreaData = ['hysjs', 'sjss']

  constructor(
    public curencyService: CurencyService,
    public formBuilder: FormBuilder,
  ){
    this.getCurencyForm();
  }

  ngOnInit(): void {
    let initalValue: curencyModel;
    this.curencyService.getLatestRates().subscribe({
      next: (value) => {
        initalValue = value;
      },
      complete: () => {
        console.log(initalValue)
        this.storeData = initalValue;
        if(initalValue.success){
          const keysArray = [];
          for(const key in initalValue.rates) {
            keysArray.push(key);
          }
          this.destinationCurrency = keysArray;
        }else{
          this.serverError = true
        }
      },
    })
  }

  submitValue(){
    if(!this.getCurencyValue.valid){
      this.isSubmitted = true;
      return;
    }
    this.calculateValue();
  }

  calculateValue(){
    let formValue = this.getCurencyValue.value;
    for(const key in this.storeData.rates) {
      if(key === formValue.destCurrency){
        let initalCal = formValue.amount * this.storeData.rates[key];
        let converAmt = (Math.round((initalCal) * 100) / 100).toLocaleString(undefined, { style: 'currency', currency: formValue.destCurrency });
        this.finalText = `${this.storeData.base} ${formValue.amount}  = ${converAmt}`
      }
    }
  }

  resetForm(){
    this.getCurencyValue.reset();
    this.isSubmitted = false;
    this.finalText = ''
  }

  getHeight() {
    let height: number;
    window.onresize = () => { };
    height = window.innerHeight;
    return Math.round(height)
  }

  getCurencyForm(){
    this.getCurencyValue = this.formBuilder.group({
      amount: ['', [Validators.required]],
      destCurrency: ['', [Validators.required]]
    });
  }

}
