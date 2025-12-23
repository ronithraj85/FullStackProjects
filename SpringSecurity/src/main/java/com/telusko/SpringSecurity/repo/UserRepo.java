package com.telusko.SpringSecurity.repo;

import com.telusko.SpringSecurity.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    User findNameByName(String name);

}
