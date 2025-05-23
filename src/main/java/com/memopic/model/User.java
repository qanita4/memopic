package com.memopic.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;  // Tambahkan field password

    // Untuk like post (opsional, dua arah)
    @ManyToMany(mappedBy = "likedBy")
    private Set<Post> likedPosts = new HashSet<>();

    // Getter, Setter
    public Long getId() { return id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }     // Tambahkan getter password
    public void setPassword(String password) { this.password = password; }  // Tambahkan setter password

    public Set<Post> getLikedPosts() { return likedPosts; }
    public void setLikedPosts(Set<Post> likedPosts) { this.likedPosts = likedPosts; }
}
