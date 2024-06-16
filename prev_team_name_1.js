prev_team_name_1
prev_odd_team_1
prev_team_name_2
prev_odd_team_2

current_team_name_1
current_odd_team_1
current_team_name_2
current_odd_team_2


percent_prev_odd_team_1 = 1 / prev_odd_team_1
percent_prev_odd_team_2 = 1 / prev_odd_team_2

percent_current_odd_team_1 = 1 / current_odd_team_1
percent_current_odd_team_2 = 1 / current_odd_team_2



if((percent_prev_odd_team_1 - percent_current_odd_team_1) => 3.0){

    true_perc = ((percent_current_odd_team_1 + percent_current_odd_team_2) - 1)/2

    true_percent_current_odd_team_1 = percent_current_odd_team_1 - true_perc
    true_percent_current_odd_team_2 = percent_current_odd_team_2 - true_perc

    true_odds_team_1 = 1 / true_percent_current_odd_team_1
    true_odds_team_2 = 1 / true_percent_current_odd_team_2

    notitfication for team 1
    game
    team name 1 vs team name 2
    now odds team 1 = prev_odd_team_1 -> current_odd_team_1
    now odds team 2 = prev_odd_team_2 -> current_odd_team_2 ((percent_prev_odd_team_1 - percent_current_odd_team_1))
    true odds team 1 = true_odds_team_1
    10% value odds = 1 / ((percent_current_odd_team_2 - true_perc) + 10.0)

}

if((percent_prev_odd_team_2 - percent_current_odd_team_2) => 10.0){

    true_perc = ((percent_current_odd_team_1 + percent_current_odd_team_2) - 1)/2

    true_percent_current_odd_team_1 = percent_current_odd_team_1 - true_perc
    true_percent_current_odd_team_2 = percent_current_odd_team_2 - true_perc

    true_odds_team_1 = 1 / true_percent_current_odd_team_1
    true_odds_team_2 = 1 / true_percent_current_odd_team_2

    notitfication for team 2
    game
    team name 1 vs team name 2
    now odds team 1 = prev_odd_team_1 -> current_odd_team_1
    now odds team 2 = prev_odd_team_2 -> current_odd_team_2 ((percent_prev_odd_team_2 - percent_current_odd_team_2))
    true odds team 2 = true_odds_team_2
    10% value odds = 1 / ((percent_current_odd_team_2 - true_perc) + 10.0)
}
