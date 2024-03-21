package com.ipl.dashboard.ipldashboard.repository;

import com.ipl.dashboard.ipldashboard.model.Match;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {

    List<Match> getByTeam1orTeam2(String teamName1, String teamName2);
}
