package com.sheshape.controller;

import com.sheshape.dto.ProfileDto;
import com.sheshape.service.ProfileService;
import com.sheshape.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService profileService;
    private final UserService userService;

    public ProfileController(ProfileService profileService, UserService userService) {
        this.profileService = profileService;
        this.userService = userService;
    }

    @GetMapping("/users/{userId}/profile")
    public ResponseEntity<ProfileDto> getUserProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(profileService.getProfileByUserId(userId));
    }

    @PutMapping("/users/{userId}/profile")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#userId)")
    public ResponseEntity<ProfileDto> updateUserProfile(
            @PathVariable Long userId,
            @Valid @RequestBody ProfileDto profileDto) {
        return ResponseEntity.ok(profileService.updateProfile(userId, profileDto));
    }

    @PostMapping(value = "/users/{userId}/profile/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#userId)")
    public ResponseEntity<Map<String, String>> uploadProfileImage(
            @PathVariable Long userId,
            @RequestParam("image") MultipartFile file) {
        String filename = profileService.uploadProfileImage(userId, file);
        
        Map<String, String> response = new HashMap<>();
        response.put("filename", filename);
        response.put("message", "Profile image uploaded successfully");
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/users/{userId}/profile/image")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#userId)")
    public ResponseEntity<Void> deleteProfileImage(@PathVariable Long userId) {
        profileService.deleteProfileImage(userId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/profile")
    public ResponseEntity<ProfileDto> getCurrentUserProfile() {
        Long userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(profileService.getProfileByUserId(userId));
    }
    
    @PutMapping("/profile")
    public ResponseEntity<ProfileDto> updateCurrentUserProfile(@Valid @RequestBody ProfileDto profileDto) {
        Long userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(profileService.updateProfile(userId, profileDto));
    }
}