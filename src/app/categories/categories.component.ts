import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CredentialsService } from '../credentials.service';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CurrencyPipe,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  products:any;
  routeshow:any;
  provideacess:boolean=true;
  getDetails:any;
  parsedDetails:any;
  particularproduct:any;
  constructor(private service:CredentialsService,private route:Router){
    if(sessionStorage.getItem('login')){
      if(sessionStorage.getItem('login')=="true"){
        this.routeshow='/products';
        this.provideacess=false;
        this.getDetails=sessionStorage.getItem('userDetails');
        this.parsedDetails=JSON.parse(this.getDetails);
        console.log(this.parsedDetails);
      }
    }
    else{
      this.provideacess=true;
      this.routeshow='/login';
    }

    service.categories().subscribe((categoriesres)=>{
      // console.log(categoriesres[0].catname);
      this.products=categoriesres;
      console.log(this.products[0]);
    });
  }

  productname(name:any){
      console.log(name);
     const result= this.products.find((value:any)=>{
      this.particularproduct=value;
        return value.catname==name;
      })
      if(result){
        sessionStorage.setItem('categoryname',JSON.stringify(this.particularproduct));
      }
      else{

      }
      this.route.navigateByUrl(this.routeshow).then(()=>{
        window.location.reload();
      })
  }
}
