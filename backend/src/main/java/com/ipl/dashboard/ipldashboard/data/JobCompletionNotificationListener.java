package com.ipl.dashboard.ipldashboard.data;

import com.ipl.dashboard.ipldashboard.model.Team;
import jakarta.persistence.EntityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class JobCompletionNotificationListener implements JobExecutionListener {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    private final JdbcTemplate jdbcTemplate;
    private final EntityManager em;
    private final AtomicLong nextId = new AtomicLong(0); // Thread-safe counter for IDs

    @Autowired
    public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate, EntityManager em) {
        this.jdbcTemplate = jdbcTemplate;
        this.em = em;
    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            Map<String, Team> teamData = new HashMap<>();

            // Gather team information using queries (with custom row mapper)
            em.createQuery("select m.team1, count(*) from Match m group by m.team1", Object[].class)
                    .getResultList()
                    .stream()
                    .map(e -> new Team((String) e[0], (long) e[1]))
                    .forEach(team -> teamData.put(team.getTeamName(), team));

            em.createQuery("select m.team2, count(*) from Match m group by m.team2", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e -> {
                        Team team = teamData.get((String) e[0]);
                        team.setTotalMatches(team.getTotalMatches() + (long) e[1]);
                    });

            em.createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e -> {
                        Team team = teamData.get((String) e[0]);
                        if(team != null) team.setTotalWins((long) e[1]);
                    });


            // Persist teams to database using JDBC update statements with generated IDs
            for (Team team : teamData.values()) {
                long id = nextId.incrementAndGet(); // Generate a unique ID
                String sql = "INSERT INTO Team (id, team_name, total_matches, total_wins) VALUES (?, ?, ?, ?)";
                jdbcTemplate.update(sql, id, team.getTeamName(), team.getTotalMatches(), team.getTotalWins());
            }

            // Optional: Log processed data for verification (can be removed)
            teamData.values().forEach(System.out::println);
        }
    }

    private static class TeamRowMapper implements RowMapper<Team> {
        @Override
        public Team mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException {
            return new Team(rs.getString(1), rs.getLong(2));
        }
    }

    private long generateUniqueId() {
        return nextId.incrementAndGet(); // Reused for clarity (can be private)
    }
}
