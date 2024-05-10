import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CurrencyPipe } from '@angular/common';
import { CredentialsService } from '../credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtocart',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CurrencyPipe],
  templateUrl: './addtocart.component.html',
  styleUrl: './addtocart.component.css'
})
export class AddtocartComponent {
  prodval:any;
  parseval:any;
  products:any;
  deleteproduct:any;
  parsedelete:any;
  splicedata:any;
  stringsession:any;
  finalbook:any;
  parsefinal:any;
  productdeliver:any;
  constructor(private service:CredentialsService,private route:Router){
    if(sessionStorage.getItem('product')){
      this.prodval=sessionStorage.getItem('product');
      this.parseval=JSON.parse(this.prodval);
      this.products=this.parseval;
      console.log(this.products);
    }
  }

  bookNow(address:any){
    window.addEventListener('submit',((e)=>{
      e.preventDefault();
      console.log(address);
      sessionStorage.setItem('deliveryaddress',address);
      this.finalbook=sessionStorage.getItem('product');
      this.parsefinal=JSON.parse(this.finalbook);

      for(var i=0;i<this.parsefinal.length;i++){
        if(i==0){
          this.productdeliver=[{
            email:this.parsefinal[i].email,
            price:this.parsefinal[i].price,
            productid:this.parsefinal[i].productid,
            productimg:this.parsefinal[i].productimg,
            productname:this.parsefinal[i].productname,
            productaddress:address
          }]
        }
        else{
          let anotherproduct={
            email:this.parsefinal[i].email,
            price:this.parsefinal[i].price,
            productid:this.parsefinal[i].productid,
            productimg:this.parsefinal[i].productimg,
            productname:this.parsefinal[i].productname,
            productaddress:address
          }
          this.productdeliver.push(anotherproduct)
        }
      }


      this.service.productBook(this.productdeliver);
    }))
  }
  deletebook(index:any,proname:any){
    this.deleteproduct=sessionStorage.getItem('product');
    this.parsedelete=JSON.parse(this.deleteproduct);
    if(this.parsedelete.length>1){
     this.splicedata= this.parsedelete.splice(index,1);
     console.log(this.splicedata);
      this.stringsession=JSON.stringify(this.parsedelete);
     sessionStorage.setItem('product',this.stringsession);
      this.route.navigateByUrl('addtocart').then(()=>{
        window.location.reload();
      })
    }
    else{
      sessionStorage.removeItem('product');
      this.route.navigateByUrl('').then(()=>{
        window.location.reload();
      })
    }
    // sessionStorage.setItem('product',proname);

  }
}
