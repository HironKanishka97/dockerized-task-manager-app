package com.devghost.st_server.controller;

import com.devghost.st_server.dto.ResponseDataObj;
import com.devghost.st_server.entity.Task;
import com.devghost.st_server.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("getall")
    public ResponseEntity<ResponseDataObj> getAll() {

        ArrayList<Task> taskslist =this.taskService.getTasks();
        if(taskslist != null) {
            return new ResponseEntity<>(new ResponseDataObj(taskslist), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResponseDataObj(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("save")
    public ResponseEntity<ResponseDataObj> save(@RequestBody Task task) {

       Task tasksaved =this.taskService.saveTask(task);
        if(tasksaved != null) {
            return new ResponseEntity<>(new ResponseDataObj(tasksaved), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResponseDataObj(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping ("update")
    public ResponseEntity<ResponseDataObj> update(@RequestBody Task task) {

        Task taskupdated =this.taskService.updateTask(task);
        if(taskupdated != null) {
            return new ResponseEntity<>(new ResponseDataObj(taskupdated), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResponseDataObj(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDataObj> delete(@RequestParam int id) {

        boolean deleted =this.taskService.deleteTask(id);
        if(deleted) {
            return new ResponseEntity<>(new ResponseDataObj(id), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ResponseDataObj(), HttpStatus.NOT_FOUND);
        }
    }


}
