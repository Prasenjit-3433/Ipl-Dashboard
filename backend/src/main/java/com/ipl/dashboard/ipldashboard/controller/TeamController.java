package com.ipl.dashboard.ipldashboard.controller;

import com.ipl.dashboard.ipldashboard.model.Team;
import com.ipl.dashboard.ipldashboard.repository.TeamRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TeamController {

    private TeamRepository teamRepository;

    public TeamController(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        return teamRepository.findByTeamName(teamName);
    }

    @GetMapping("/team")
    public List<Team> getAllTeams() {
        return teamRepository.findAll(); // Retrieve all teams
    }

}
