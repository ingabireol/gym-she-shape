package com.sheshape.dto.profile;

import com.sheshape.model.profile.Profile.Gender;
import com.sheshape.model.profile.FitnessProfile.FitnessLevel;
import com.sheshape.model.profile.FitnessProfile.FitnessGoal;
import com.sheshape.model.profile.FitnessProfile.ActivityType;
import com.sheshape.model.profile.UserPreferences.PrivacyLevel;
import com.sheshape.model.User.Role;
import lombok.Data;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ProfileResponseDTO {
    
    // User Information (from your existing User model)
    private Long userId;
    private String username;
    private String email;
    private Role role;
    private Boolean isActive;
    private Boolean profileCompleted;
    private LocalDateTime userCreatedAt;
    private LocalDateTime userUpdatedAt;
    
    // Basic Profile Information
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String phoneNumber;
    private String profilePictureUrl;
    
    // Physical Attributes
    private Integer heightCm;
    private Double currentWeightKg;
    private Double targetWeightKg;
    
    // Fitness Information
    private FitnessLevel fitnessLevel;
    private FitnessGoal primaryGoal;
    private List<FitnessGoal> fitnessGoals;
    private List<ActivityType> preferredActivities;
    private Integer workoutFrequencyPerWeek;
    private Integer preferredWorkoutDurationMinutes;
    private String preferredWorkoutTimes;
    
    // Health Information
    private String dietaryRestrictions;
    private String healthConditions;
    private String medications;
    private String emergencyContactName;
    private String emergencyContactPhone;
    
    // Preferences
    private String timezone;
    private String language;
    private Boolean emailNotifications;
    private Boolean pushNotifications;
    private PrivacyLevel privacyLevel;
    
    // Metadata
    private LocalDateTime profileCreatedAt;
    private LocalDateTime profileUpdatedAt;
}
