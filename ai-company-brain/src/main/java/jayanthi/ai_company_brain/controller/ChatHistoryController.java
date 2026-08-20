package jayanthi.ai_company_brain.controller;
import jayanthi.ai_company_brain.entity.ChatHistory;
import jayanthi.ai_company_brain.repository.ChatHistoryRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chat-history")
public class ChatHistoryController {

    private final ChatHistoryRepository chatHistoryRepository;

    public ChatHistoryController(ChatHistoryRepository chatHistoryRepository) {
        this.chatHistoryRepository = chatHistoryRepository;
    }

    @GetMapping
    public List<ChatHistory> getChatHistory() {

        return chatHistoryRepository.findTop10ByOrderByIdDesc();
    }
}
