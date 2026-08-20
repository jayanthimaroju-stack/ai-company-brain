package jayanthi.ai_company_brain.controller;

import jakarta.validation.Valid;
import jayanthi.ai_company_brain.dto.AuthResponse;
import jayanthi.ai_company_brain.dto.LoginRequest;
import jayanthi.ai_company_brain.dto.RegisterRequest;
import jayanthi.ai_company_brain.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}