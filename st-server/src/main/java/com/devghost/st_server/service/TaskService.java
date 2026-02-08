package com.devghost.st_server.service;

import com.devghost.st_server.dao.TaskDao;
import com.devghost.st_server.entity.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final TaskDao taskDao;

    public TaskService(TaskDao taskDao) {
        this.taskDao = taskDao;
    }

    public ArrayList<Task> getTasks() {
        List<Task> tasks = taskDao.findAll();
        return (ArrayList<Task>) tasks;
    }

    public Task saveTask(Task task) {
        Task saved= taskDao.save(task);
        if(saved.getId()>0){
            return task;
        }else{
            return null;
        }
    }

    public Task updateTask(Task task) {
        if (!taskDao.existsById(task.getId())) {
            return null;
        }
        return taskDao.save(task);
    }

    public boolean deleteTask(int id) {
        if (!taskDao.existsById(id)) {
            return false;
        }
        taskDao.deleteById(id);
        return true;
    }
}
