package com.telusko.SpringSecurity.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User {


    @Id
    private String name;

    private String password;

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
