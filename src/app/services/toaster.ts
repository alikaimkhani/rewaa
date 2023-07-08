import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})

export class Toaster {


    constructor(private toaster: ToastrService) { }


    ToasterMessage(){
        this.toaster.success('Order submitted successfully', 'Success');

    }

}