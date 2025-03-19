package com.sheshape.service;

import com.sheshape.dto.ProfileDto;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {
    
    ProfileDto getProfileByUserId(Long userId);
    
    ProfileDto updateProfile(Long userId, ProfileDto profileDto);
    
    String uploadProfileImage(Long userId, MultipartFile file);
    
    void deleteProfileImage(Long userId);
}