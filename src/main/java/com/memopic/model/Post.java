package com.memopic.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private LocalDateTime timestamp = LocalDateTime.now();

    @ManyToOne
    private User user; // Penulis

    @ManyToMany
    private Set<User> likedBy = new HashSet<>();

    // Getter, Setter
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Set<User> getLikedBy() { return likedBy; }
    public void setLikedBy(Set<User> likedBy) { this.likedBy = likedBy; }
}
