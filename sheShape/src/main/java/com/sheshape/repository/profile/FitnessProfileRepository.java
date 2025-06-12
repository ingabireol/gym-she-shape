package com.sheshape.repository.profile;

import com.sheshape.model.profile.FitnessProfile;
import com.sheshape.model.profile.FitnessProfile.FitnessLevel;
import com.sheshape.model.profile.FitnessProfile.FitnessGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FitnessProfileRepository extends JpaRepository<FitnessProfile, Long> {
    
    Optional<FitnessProfile> findByUserId(Long userId);
    
    boolean existsByUserId(Long userId);
    
    void deleteByUserId(Long userId);
    
    @Query("SELECT fp FROM FitnessProfile fp WHERE fp.fitnessLevel = :level")
    List<FitnessProfile> findByFitnessLevel(@Param("level") FitnessLevel level);
    
    @Query("SELECT fp FROM FitnessProfile fp WHERE fp.primaryGoal = :goal")
    List<FitnessProfile> findByPrimaryGoal(@Param("goal") FitnessGoal goal);
    
    @Query("SELECT fp FROM FitnessProfile fp WHERE fp.workoutFrequencyPerWeek >= :minFrequency")
    List<FitnessProfile> findByMinWorkoutFrequency(@Param("minFrequency") Integer minFrequency);
}