package LifePlannerBackend.LifePlanner.Controllers;

import LifePlannerBackend.LifePlanner.Entities.Tasks;
import LifePlannerBackend.LifePlanner.Repository.TasksRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TaskController {

    private TasksRepository tasksRepository;

    public TaskController(TasksRepository TasksRepository) {
        this.tasksRepository = TasksRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getTasks")
    public List<Tasks> getTasks(){
        return tasksRepository.findAll();
    }

}