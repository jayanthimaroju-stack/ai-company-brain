package jayanthi.ai_company_brain.controller;
import java.util.*;

import jakarta.validation.Valid;
import jayanthi.ai_company_brain.entity.Employee;
import jayanthi.ai_company_brain.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Add Employee
    @PostMapping
    public Employee addEmployee(@Valid @RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }

    // Get Employees with Pagination and Sorting
    @GetMapping
    public Page<Employee> getEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy) {

        return employeeService.getEmployees(page, size, sortBy);
    }
    // Search Employee by Name
    @GetMapping("/search/name")
    public List<Employee> searchByName(@RequestParam String name) {

        return employeeService.searchByName(name);
    }

    // Search Employee by Department
    @GetMapping("/search/department")
    public List<Employee> searchByDepartment(@RequestParam String department) {

        return employeeService.searchByDepartment(department);
    }

    // Get Employee By ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    // Update Employee
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id,
                                   @Valid @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    // Delete Employee
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return "Employee deleted successfully";
    }
}