package com.sheshape.model.profile;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "fitness_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FitnessProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "fitness_level")
    private FitnessLevel fitnessLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "primary_goal")
    private FitnessGoal primaryGoal;

    @ElementCollection(targetClass = FitnessGoal.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_fitness_goals", joinColumns = @JoinColumn(name = "fitness_profile_id"))
    @Column(name = "fitness_goal")
    private List<FitnessGoal> fitnessGoals;

    @ElementCollection(targetClass = ActivityType.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_preferred_activities", joinColumns = @JoinColumn(name = "fitness_profile_id"))
    @Column(name = "activity_type")
    private List<ActivityType> preferredActivities;

    @Column(name = "workout_frequency_per_week")
    private Integer workoutFrequencyPerWeek;

    @Column(name = "preferred_workout_duration_minutes")
    private Integer preferredWorkoutDurationMinutes;

    @Column(name = "preferred_workout_times")
    private String preferredWorkoutTimes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum FitnessLevel {
        BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
    }

    public enum FitnessGoal {
        WEIGHT_LOSS, MUSCLE_GAIN, STRENGTH_BUILDING, ENDURANCE, 
        FLEXIBILITY, GENERAL_FITNESS, STRESS_RELIEF, REHABILITATION
    }

    public enum ActivityType {
        CARDIO, STRENGTH_TRAINING, YOGA, PILATES, HIIT, 
        DANCE, SWIMMING, RUNNING, CYCLING, WALKING
    }
}