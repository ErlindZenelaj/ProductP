import { Component,OnInit,Inject, NgZone } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

alertWitchSuccess() {
throw new Error('Method not implemented.');
}
  title = 'productapp';
  productForm !:FormGroup;
  actionBtn : string = "Save";

  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>){ }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      price : ['',Validators.required],
      date : ['',Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{   
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Product Updated Successfully!',
              showConfirmButton: false,
              timer: 1500
            })  
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Something went wrong!',
              showConfirmButton: false,
              timer: 1500
            })
           
          }
        })
      } 
    }else {
      this.updateProduct()
    }
    }
    updateProduct(){
      this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Product Updated Successfully!',
          showConfirmButton: false,
          timer: 1500
        }) 
          
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }






