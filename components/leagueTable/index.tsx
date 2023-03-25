import React from "react";
import { Standings } from "../../app/api/schema";
import styles from "./League-table.module.css";

export default function LeagueTable({ standings }: { standings: Standings[] }) {
  console.log(standings[0].team);
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Standings</h2>
      {standings != null ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Team</th>
              <th>Played</th>
              <th>Won</th>
              <th>Draw</th>
              <th>Lost</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr
                key={team.team.id}
                className={`${index % 2 === 0 ? styles.evenRow : ""} ${
                  styles.hoverableRow
                }`}
              >
                <td>{team.team.name}</td>
                <td>{team.all.played}</td>
                <td>{team.all.win}</td>
                <td>{team.all.draw}</td>
                <td>{team.all.lose}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noData}>No standings available</p>
      )}
    </main>
  );
}
