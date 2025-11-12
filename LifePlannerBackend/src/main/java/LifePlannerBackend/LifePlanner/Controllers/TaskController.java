package LifePlannerBackend.LifePlanner.Controllers;

import LifePlannerBackend.LifePlanner.Entities.Tasks;
import LifePlannerBackend.LifePlanner.Repository.TasksRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.config.authentication.AuthenticationProviderBeanDefinitionParser;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TasksRepository tasksRepository;

    public TaskController(TasksRepository TasksRepository) {
        this.tasksRepository = TasksRepository;
    }


    @GetMapping("/getTasks")
    public List<Tasks> getTasks(){
        return tasksRepository.findAll();
    }


    @PostMapping("/addTask")
    public Tasks addTask(@RequestBody Tasks task){

        if (task.getDate() != null){
            task.setStatus(true);
        } else {
            task.setStatus(false);
        }
        return tasksRepository.save(task);
    }


    @DeleteMapping("/deleteTask/{id}")
    public void deleteTask(@PathVariable Integer id){
        tasksRepository.deleteById(id);
    }


    @PutMapping("/editTask/{id}")
    public Tasks editTask(@PathVariable int id, @RequestBody Tasks updatedTask){
        return tasksRepository.findById(id).map(task -> {
            task.setText(updatedTask.getText());
            task.setDate(updatedTask.getDate());
            task.setStatus(updatedTask.getDate() != null);
            return tasksRepository.save(task);
        })
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

}