package com.telusko.AOPDemo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Aliens {

    @Id
    private Integer id;

    private String name;

    private String city;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "Alien{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                '}';
    }

    public Aliens(Integer id, String name, String city) {
        this.id = id;
        this.name = name;
        this.city = city;
    }

    public Aliens() {
    }
}
