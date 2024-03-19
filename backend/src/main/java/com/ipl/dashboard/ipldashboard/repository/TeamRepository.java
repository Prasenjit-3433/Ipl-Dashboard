package com.ipl.dashboard.ipldashboard.repository;

import com.ipl.dashboard.ipldashboard.model.Team;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TeamRepository extends CrudRepository<Team, Long> {

    Team findByTeamName(String teamName);
    List<Team> findAll();
}
