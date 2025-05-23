package com.memopic.repository;

import com.memopic.model.Post;
import com.memopic.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);
}
