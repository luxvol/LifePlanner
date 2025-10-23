package LifePlannerBackend.LifePlanner.Repository;

import LifePlannerBackend.LifePlanner.Entities.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TasksRepository extends JpaRepository <Tasks, Integer> {
}
