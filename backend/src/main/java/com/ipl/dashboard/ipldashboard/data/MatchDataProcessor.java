package com.ipl.dashboard.ipldashboard.data;

import com.ipl.dashboard.ipldashboard.model.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDate;

public class MatchDataProcessor implements ItemProcessor<MatchInput, Match> {

    private static final Logger log = LoggerFactory.getLogger(MatchDataProcessor.class);

    @Override
    public Match process(final MatchInput matchInput) {
        Match match = new Match();

        match.setId(Long.parseLong(matchInput.getID()));
        match.setCity(matchInput.getCity());
        match.setDate(LocalDate.parse(matchInput.getDate()));
        match.setPlayerOfMatch(matchInput.getPlayer_of_Match());

        // Set Team 1 and Team 2 depending on the innings order
        String firstInningsTeam, secondInningsTeam;

        if ("bat".equals(matchInput.getTossDecision())) {
            firstInningsTeam = matchInput.getTossWinner();
            secondInningsTeam = !matchInput.getTossWinner().equals(matchInput.getTeam1()) ?
                    matchInput.getTeam2() : matchInput.getTeam1();
        } else {
            secondInningsTeam = matchInput.getTossWinner();
            firstInningsTeam = matchInput.getTossWinner().equals(matchInput.getTeam1()) ?
                    matchInput.getTeam2() : matchInput.getTeam1();
        }

        match.setTeam1(firstInningsTeam);
        match.setTeam2(secondInningsTeam);

        match.setTossWinner(matchInput.getTossWinner());
        match.setTossDecision(matchInput.getTossDecision());
        match.setResult(matchInput.getWonBy());
        match.setResultMargin(matchInput.getMargin());
        match.setUmpire1(matchInput.getUmpire1());
        match.setUmpire2(matchInput.getUmpire2());

        return match;
    }

}