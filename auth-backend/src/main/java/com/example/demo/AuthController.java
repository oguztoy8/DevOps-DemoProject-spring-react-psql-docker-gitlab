package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // Frontend'den gelen isteklere izin ver
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Kayıt olma
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Tüm kullanıcıları listeleme (Test için)
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    
    // Basit kontrol
    @GetMapping("/test")
    public String test() {
        return "Backend (Spring Boot) running! Port: 8081";
    }
}