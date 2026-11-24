import {
  Component,
  signal,
  linkedSignal,
  computed,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EmployeeFilter } from '../empoyee-filter.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeFilter, ReactiveFormsModule],
  styles: `/* Main Grid */
  .dashboard {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 20px;
    padding: 24px;
    align-items: start;
    background: #f4f6f9;
    min-height: 100vh;
  }
  
  /* Common Card */
  .card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }
  
  .card h2 {
    margin-top: 0;
    color: #263238;
  }
  
  .subtitle {
    color: #7b8794;
    font-size: 13px;
    margin-bottom: 24px;
  }
  
  /* Form */
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }
  
  .form-group label {
    font-weight: 600;
    margin-bottom: 7px;
    font-size: 14px;
  }
  
  .form-group input {
    padding: 11px;
    border: 1px solid #d5dce5;
    border-radius: 6px;
    outline: none;
    font-size: 14px;
  }
  
  .form-group input:focus {
    border-color: #2563eb;
  }
  
  /* Validation */
  .error {
    color: #dc2626;
    font-size: 12px;
    margin-top: 5px;
  }
  
  /* Skills */
  .skills-section {
    margin-top: 24px;
    border-top: 1px solid #e5e7eb;
    padding-top: 15px;
  }
  
  .skill-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .skill-row .form-group {
    flex: 1;
  }
  
  .add-btn,
  .remove-btn,
  .submit-btn {
    padding: 10px 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .add-btn {
    background: #e0eaff;
    color: #1d4ed8;
  }
  
  .remove-btn {
    background: #fee2e2;
    color: #dc2626;
  }
  
  .remove-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .submit-btn {
    width: 100%;
    margin-top: 20px;
    background: #2563eb;
    color: white;
    font-weight: 600;
  }
  
  /* Employee Summary */
  .summary-item {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 14px 0;
    border-bottom: 1px solid #eee;
  }
  
  .summary-item label {
    font-size: 12px;
    color: #7b8794;
  }
  
  .summary-item strong {
    font-size: 14px;
    overflow-wrap: anywhere;
  }
  
  /* Skills Summary */
  .skill-count {
    background: #eff6ff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 25px;
  }
  
  .skill-count h1 {
    color: #2563eb;
    font-size: 36px;
    margin: 0;
  }
  
  .skill-count p {
    margin-bottom: 0;
    color: #64748b;
  }
  
  .skill-badge {
    display: inline-block;
    background: #dcfce7;
    color: #166534;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 20px;
    font-size: 13px;
  }
  
  /* Responsive */
  @media (max-width: 1100px) {
    .dashboard {
      grid-template-columns: 1fr 1fr;
    }
  
    .employee-form {
      grid-column: span 2;
    }
  }
  
  @media (max-width: 650px) {
    .dashboard {
      grid-template-columns: 1fr;
    }
  
    .employee-form {
      grid-column: span 1;
    }
  }`,
  template: `
    <h1>Search Signals Example</h1>

    <input
      type="search"
      [value]="searchQuery()"
      (input)="searchQuery.set($any($event.target).value)"
      placeholder="Search Product"
    />

    <p>Found {{ filteredProduct().length }} products</p>

    <table border="1">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        @for (product of filteredProduct() ; track product.id) {
          <tr>
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
          </tr>
        } @empty {
          <tr>
            <td colspan="4">No products found</td>
          </tr>
        }
      </tbody>
    </table>


    <h2>Search employee from table </h2>

    <input type="text" [(ngModel)]="searchText" />
    <table border='1' colpadding="10">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Emaol</th>
          <th>department</th>
          <th>title</th>
          <th>salary</th>
          <th>hireDate</th>
          <th>remote</th>
          <th>manager</th>
        </tr>
      </thead>
      <tbody>
        @for(employee of employees | employeeFilter: searchText;; track employee.id){
          <tr>
            <td>{{employee.id}}</td>
            <td>{{employee.name}}</td>
            <td>{{employee.email}}</td>
            <td>{{employee.department}}</td>
            <td>{{employee.title}}</td>
            <td>{{employee.salary}}</td>
            <td>{{employee.hireDate}}</td>
            <td>{{employee.remote}}</td>
            <td>{{employee.manager}}</td>
        </tr>
        } @empty{
          <tr>
            <td colspan="4"> no data</td>
          </tr>
        }
      </tbody>
    </table>


    <h2>REactive Forms </h2>

    <div class="dashboard">

<!-- SECTION 1: Employee Form -->
<section class="card employee-form">

  <h2>Employee Registration</h2>
  <p class="subtitle">Enter employee details</p>

  <form [formGroup]="userForm" (ngSubmit)="Submit()">

    <div class="form-group">
      <label>First Name</label>
      <input type="text" formControlName="firstName" placeholder="Enter first name" />

      @if(userForm.get('firstName')?.touched &&
      userForm.get('firstName')?.hasError('required')) {
        <span class="error">First Name is Required</span>
      }

      @if(userForm.get('firstName')?.touched &&
      userForm.get('firstName')?.hasError('minlength')) {
        <span class="error">Minimum 3 characters required</span>
      }
    </div>

    <div class="form-group">
      <label>Last Name</label>
      <input type="text" formControlName="lastName" placeholder="Enter last name" />

      @if(userForm.get('lastName')?.touched &&
      userForm.get('lastName')?.hasError('required')) {
        <span class="error">Last Name is Required</span>
      }
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="email" formControlName="email" placeholder="Enter email" />

      @if(userForm.get('email')?.touched &&
      userForm.get('email')?.hasError('required')) {
        <span class="error">Email is Required</span>
      }

      @if(userForm.get('email')?.touched &&
      userForm.get('email')?.hasError('email')) {
        <span class="error">Invalid Email</span>
      }
    </div>

    <div class="form-group">
      <label>Department</label>
      <input type="text" formControlName="department" placeholder="Enter department" />

      @if(userForm.get('department')?.touched &&
      userForm.get('department')?.hasError('required')) {
        <span class="error">Department is Required</span>
      }
    </div>

    <div class="form-group">
      <label>Role</label>
      <input type="text" formControlName="role" placeholder="Enter role" />

      @if(userForm.get('role')?.touched &&
      userForm.get('role')?.hasError('required')) {
        <span class="error">Role is Required</span>
      }
    </div>

    <!-- Dynamic Skills -->
    <div class="skills-section">

      <h3>Employee Skills</h3>

      <div formArrayName="skills">

        @for(skill of skills.controls; track $index) {

          <div class="skill-row">

            <div class="form-group">
              <label>Skill {{ $index + 1 }}</label>

              <input
                type="text"
                [formControlName]="$index"
                placeholder="Enter skill"
              />

              @if(skill.touched && skill.hasError('required')) {
                <span class="error">Skill is Required</span>
              }
            </div>

            <button
              type="button"
              class="remove-btn"
              (click)="removeSkill($index)"
              [disabled]="skills.length === 1">
              Remove
            </button>

          </div>

        }

      </div>

      <button type="button" class="add-btn" (click)="addSkill()">
        + Add Skill
      </button>

    </div>

    <button type="submit" class="submit-btn">
      Submit Employee
    </button>

  </form>

</section>


<!-- SECTION 2: Employee Summary -->
<section class="card">

  <h2>Employee Summary</h2>
  <p class="subtitle">Employee information overview</p>

  <div class="summary-item">
    <label>First Name</label>
    <strong>{{ userForm.get('firstName')?.value || '-' }}</strong>
  </div>

  <div class="summary-item">
    <label>Last Name</label>
    <strong>{{ userForm.get('lastName')?.value || '-' }}</strong>
  </div>

  <div class="summary-item">
    <label>Email</label>
    <strong>{{ userForm.get('email')?.value || '-' }}</strong>
  </div>

  <div class="summary-item">
    <label>Department</label>
    <strong>{{ userForm.get('department')?.value || '-' }}</strong>
  </div>

  <div class="summary-item">
    <label>Role</label>
    <strong>{{ userForm.get('role')?.value || '-' }}</strong>
  </div>

</section>


<!-- SECTION 3: Skills Summary -->
<section class="card">

  <h2>Skills Overview</h2>
  <p class="subtitle">Dynamic skills added by employee</p>

  <div class="skill-count">
    <h1>{{ skills.length }}</h1>
    <p>Total Skills</p>
  </div>

  <h3>Added Skills</h3>

  @for(skill of skills.controls; track $index) {

    @if(skill.value) {
      <div class="skill-badge">
        {{ skill.value }}
      </div>
    }

  }

  @if(skills.length === 0) {
    <p>No skills added yet.</p>
  }

</section>

</div>

    


  `,
})
export class App {
  searchQuery = signal('');

  allProducts = signal([
    { id: 1, name: 'Amla', description: 'Amla juice', price: 100 },
    { id: 2, name: 'Apple', description: 'Fresh apple', price: 150 },
    { id: 3, name: 'Banana', description: 'Fresh banana', price: 50 },
    { id: 4, name: 'Carrot', description: 'Fresh carrot', price: 80 },
    { id: 5, name: 'Guava', description: 'Fresh guava', price: 70 },
  ]);

  filteredProduct = computed(() =>
    this.allProducts().filter((product) =>
      product.name.toLowerCase().includes(this.searchQuery().toLowerCase())
    )
  );

  searchText = '';

  employees = [
    {
      id: 1,
      name: 'Linus Allen',
      email: 'linus.allen@company.example',
      department: 'Sales',
      title: 'Staff Designer',
      salary: 106000,
      hireDate: '2019-08-27',
      remote: true,
      manager: null,
    },
    {
      id: 2,
      name: 'Yukihiro Allen',
      email: 'yukihiro.allen@company.example',
      department: 'Finance',
      title: 'Senior Manager',
      salary: 173000,
      hireDate: '2023-07-06',
      remote: false,
      manager: null,
    },
    {
      id: 3,
      name: 'Rasmus Liskov',
      email: 'rasmus.liskov@company.example',
      department: 'Sales',
      title: 'Junior Manager',
      salary: 140000,
      hireDate: '2023-02-23',
      remote: false,
      manager: null,
    },
  ];

  // userForm: FormGroup;
  fb = inject(FormBuilder);

  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    role: ['', Validators.required],
    department: ['', Validators.required],
    skills: this.fb.array([this.createSkill()]),
  });

  createSkill() {
    return this.fb.control('', Validators.required);
  }

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.createSkill());
  }

  removeSkill($index: number) {
    this.skills.removeAt($index);
  }

  Submit() {
    console.log(this.userForm.value);
  }
}

bootstrapApplication(App);
