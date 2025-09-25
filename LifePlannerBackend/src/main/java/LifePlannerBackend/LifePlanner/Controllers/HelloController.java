package LifePlannerBackend.LifePlanner.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HelloController {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/hello")
    public Map<String, String> hello(){
        return Collections.singletonMap("message", "Hello, LifePlanner!");
    }

}