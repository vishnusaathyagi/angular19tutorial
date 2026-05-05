// app.component.ts
import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { UsersService } from './services/users.service';
import { user } from './interface/user';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})  
export class AppComponent {
  title = 'services'; // Application title
  users : user[] = []; // Stores list of users
  selectedUser : user | undefined; // Holds currently selected user for update

  productData : {
    name: string,
    price: number,
    category: string
  }[] | undefined; // Example product data (not used here)

  constructor(private productService: ProductService,
              private userService: UsersService
  ) { }

  // Lifecycle hook: called when component initializes
  ngOnInit(){
    this.userService.getUsers().subscribe((data:user[]) => {
      this.users = data; // Load all users from API
    });
  }

  // Fetches all users from API and updates local list
  getUsers(){
    this.userService.getUsers().subscribe((data:user[]) => {
      this.users = data;
    });
  }

  // Adds a new user OR updates an existing user based on selection
  addUser(data: user) {
    if(!this.selectedUser){
      // If no user selected, create new user
      this.userService.saveUsers(data).subscribe((response: user) => {
        if(data){
          this.getUsers(); // Refresh list after adding
        }
      });
    } else {
      // If user selected, update existing user with same ID
      const userData = {...data,id:this.selectedUser.id};
      this.userService.updateUser(userData).subscribe((response: user) => {
        if(data){
          this.getUsers(); // Refresh list after update
        }
      });
    }
  }

  // Deletes a user by ID and refreshes list
  deleteUser(id: string) {
    this.userService.deleteUsers(id).subscribe((data:user) => {
      console.log('deleted data :',data); // Log deleted user
      if(data){
        this.getUsers(); // Refresh list after deletion
      }
    });
  }

  // Selects a user by ID for editing
  selectUser(id:string){
    console.log(" selected user id : ", id); // Log selected user ID
    this.userService.getSelectedUser(id).subscribe((data:user) => {
      console.log(data); // Log selected user data
      this.selectedUser = data; // Store selected user for update
    });
  }

}
