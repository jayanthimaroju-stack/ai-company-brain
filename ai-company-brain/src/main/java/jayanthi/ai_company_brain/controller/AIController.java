package jayanthi.ai_company_brain.controller;

import jayanthi.ai_company_brain.dto.AIRequest;
import jayanthi.ai_company_brain.dto.AIResponse;
import jayanthi.ai_company_brain.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/ask")
    public ResponseEntity<AIResponse> ask(@RequestBody AIRequest request) {

        return ResponseEntity.ok(new AIResponse(aiService.askAI(request.getQuestion())));

    }
}