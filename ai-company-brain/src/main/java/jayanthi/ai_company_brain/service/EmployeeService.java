//package jayanthi.ai_company_brain.service;
//
////package jayanthi.ai_company_brain.service;
//
//import jayanthi.ai_company_brain.entity.Employee;
//import jayanthi.ai_company_brain.repository.EmployeeRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class EmployeeService {
//
//    @Autowired
//    private EmployeeRepository employeeRepository;
//
//    // Save Employee
//    public Employee saveEmployee(Employee employee) {
//        return employeeRepository.save(employee);
//    }
//
//    // Get All Employees
//    public List<Employee> getAllEmployees() {
//        return employeeRepository.findAll();
//    }
//        public Employee getEmployeeById(Long id) {
//            return employeeRepository.findById(id).orElse(null);
//        }
//    public Employee updateEmployee(Long id, Employee employee) {
//
//        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
//
//        if (existingEmployee != null) {
//            existingEmployee.setName(employee.getName());
//            existingEmployee.setDepartment(employee.getDepartment());
//            existingEmployee.setRole(employee.getRole());
//            existingEmployee.setSalary(employee.getSalary());
//
//            return employeeRepository.save(existingEmployee);
//        }
//
//        return null;
//    }
//    }
package jayanthi.ai_company_brain.service;
import java.util.*;

import jayanthi.ai_company_brain.entity.Employee;
import jayanthi.ai_company_brain.exception.EmployeeNotFoundException;
import jayanthi.ai_company_brain.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Save Employee
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get Employees with Pagination and Sorting
    public Page<Employee> getEmployees(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        return employeeRepository.findAll(pageable);
    }

    // Get Employee By ID
    public Employee getEmployeeById(Long id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException("Employee not found with id: " + id));
    }

    // Update Employee
    public Employee updateEmployee(Long id, Employee employee) {

        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException("Employee not found with id: " + id));

        existingEmployee.setName(employee.getName());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setDepartment(employee.getDepartment());

        return employeeRepository.save(existingEmployee);
    }
    // Search Employee by Name
    public List<Employee> searchByName(String name) {

        return employeeRepository.findByNameContainingIgnoreCase(name);
    }

    // Search Employee by Department
    public List<Employee> searchByDepartment(String department) {

        return employeeRepository.findByDepartmentIgnoreCase(department);
    }

    // Delete Employee
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException("Employee not found with id: " + id));

        employeeRepository.delete(employee);
    }
}