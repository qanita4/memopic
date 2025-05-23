package com.memopic.controller;

import com.memopic.model.Post;
import com.memopic.model.User;
import com.memopic.repository.PostRepository;
import com.memopic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    // DTO untuk response
    public static class PostDto {
        public Long id;
        public String title;
        public String content;
        public String username;
        public String timestamp;
        public boolean likedByUser;

        public PostDto(Post post, String currentUsername) {
            this.id = post.getId();
            this.title = post.getTitle();
            this.content = post.getContent();
            this.username = post.getUser().getUsername();
            this.timestamp = post.getTimestamp().toString();
            this.likedByUser = post.getLikedBy().stream()
                .anyMatch(user -> user.getUsername().equals(currentUsername));
        }
    }

    // 1. GET semua post (+ info like user)
    @GetMapping("/posts")
    public List<PostDto> getAllPosts(@RequestParam(required = false) String username) {
        List<Post> posts = postRepository.findAll();
        String currentUsername = username != null ? username : "";
        return posts.stream()
            .map(post -> new PostDto(post, currentUsername))
            .collect(Collectors.toList());
    }

    // 2. CREATE post
    @PostMapping("/posts")
    public String createPost(@RequestParam String username, @RequestBody Post post) {
        User user = userRepository.findByUsername(username);
        if (user == null) return "User not found";
        post.setUser(user);
        postRepository.save(post);
        return "Post created";
    }

    // 3. LIKE post
    @PostMapping("/posts/{id}/like")
    public String likePost(@PathVariable Long id, @RequestParam String username) {
        Post post = postRepository.findById(id).orElse(null);
        User user = userRepository.findByUsername(username);
        if (post == null || user == null) return "Post/User not found";
        post.getLikedBy().add(user);
        postRepository.save(post);
        return "Post liked";
    }

    // 4. UNLIKE post
    @DeleteMapping("/posts/{id}/like")
    public String unlikePost(@PathVariable Long id, @RequestParam String username) {
        Post post = postRepository.findById(id).orElse(null);
        User user = userRepository.findByUsername(username);
        if (post == null || user == null) return "Post/User not found";
        post.getLikedBy().remove(user);
        postRepository.save(post);
        return "Post unliked";
    }

    // 5. EDIT post
    @PatchMapping("/posts/{id}")
    public String editPost(@PathVariable Long id, @RequestParam String username, @RequestBody Post updatedPost) {
        Post post = postRepository.findById(id).orElse(null);
        if (post == null) return "Post not found";
        if (!post.getUser().getUsername().equals(username)) return "Unauthorized";
        post.setTitle(updatedPost.getTitle());
        post.setContent(updatedPost.getContent());
        postRepository.save(post);
        return "Post updated";
    }

    // 6. DELETE post
    @DeleteMapping("/posts/{id}")
    public String deletePost(@PathVariable Long id, @RequestParam String username) {
        Post post = postRepository.findById(id).orElse(null);
        if (post == null) return "Post not found";
        if (!post.getUser().getUsername().equals(username)) return "Unauthorized";
        postRepository.delete(post);
        return "Post deleted";
    }
}
