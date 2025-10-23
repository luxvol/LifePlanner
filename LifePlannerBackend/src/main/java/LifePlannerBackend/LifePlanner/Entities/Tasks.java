package LifePlannerBackend.LifePlanner.Entities;


import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Tasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "text")
    private String text;

    @Column(name = "status")
    private boolean status;

    public Tasks() {}

    public Tasks(int id, String text, boolean status) {
        this.id = id;
        this.text = text;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Tasks{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", status=" + status +
                '}';
    }
}
