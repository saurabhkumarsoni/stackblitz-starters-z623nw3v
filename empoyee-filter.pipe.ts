import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeFilter',
  standalone: true,
})
export class EmployeeFilter implements PipeTransform {
  transform(employees: any[] | null | undefined, searchText: string): any[] {
    if (!employees) {
      return [];
    }

    if (!searchText?.trim()) {
      return employees;
    }

    const search = searchText.toLowerCase().trim();

    return employees.filter((employee) => {
      return (
        String(employee.name ?? '')
          .toLowerCase()
          .includes(search) ||
        String(employee.email ?? '')
          .toLowerCase()
          .includes(search) ||
        String(employee.department ?? '')
          .toLowerCase()
          .includes(search) ||
        String(employee.title ?? '')
          .toLowerCase()
          .includes(search) ||
        String(employee.salary ?? '')
          .toLowerCase()
          .includes(search) ||
        String(employee.hireDate ?? '')
          .toLowerCase()
          .includes(search) ||
        String(employee.manager ?? '')
          .toLowerCase()
          .includes(search)
      );
    });
  }
}
