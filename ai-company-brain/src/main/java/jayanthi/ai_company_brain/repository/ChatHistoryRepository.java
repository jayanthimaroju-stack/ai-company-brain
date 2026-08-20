package jayanthi.ai_company_brain.repository;

import jayanthi.ai_company_brain.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {

    List<ChatHistory> findTop10ByOrderByIdDesc();
}
