package com.devghost.st_server.dto;

import com.devghost.st_server.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDataObj {
    private int id;
    private Task task;
    private ArrayList<Task> tasks;



    public ResponseDataObj(int id) {
        this.id = id;
    }

    public ResponseDataObj(Task task) {
        this.task = task;
    }

    public ResponseDataObj(ArrayList<Task> tasks) {
        this.tasks = tasks;
    }
}
