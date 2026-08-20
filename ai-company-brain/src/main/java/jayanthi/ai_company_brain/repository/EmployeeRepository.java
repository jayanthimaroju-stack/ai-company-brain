package jayanthi.ai_company_brain.repository;

import jayanthi.ai_company_brain.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Search employees by name (case-insensitive)
    List<Employee> findByNameContainingIgnoreCase(String name);

    // Search employees by department (case-insensitive)
    List<Employee> findByDepartmentIgnoreCase(String department);

}