package LifePlannerBackend.LifePlanner.Controllers;

import LifePlannerBackend.LifePlanner.Entities.Tasks;
import LifePlannerBackend.LifePlanner.Repository.TasksRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

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

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addTask")
    public Tasks addTask(@RequestBody Tasks task){
        return tasksRepository.save(task);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deleteTask/{id}")
    public void deleteTask(@PathVariable Integer id){
        tasksRepository.deleteById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/editTask/{id}")
    public Tasks editTask(@PathVariable int id, @RequestBody Tasks updatedTask){
        return tasksRepository.findById(id).map(task -> {
            task.setText(updatedTask.getText());
            task.setStatus(updatedTask.isStatus());
            return tasksRepository.save(task);
        })
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

}