export const fixJson = text => {
  const ignored_groups = ['Oppositioryhmät', 'Hallitusryhmät']

  const jsonData = JSON.parse(text.replace(/'/g, '"')).distr

  const votes_distribution = jsonData.filter(
    vote => !ignored_groups.includes(vote.group)
  )

  return votes_distribution
}

export const getTotalDistribution = votes => {
  const total_votes = {
    for: 0,
    against: 0,
    empty: 0,
    away: 0,
  }

  votes.forEach(vote => {
    Object.keys(vote.vote_counts).forEach(
      key => (total_votes[key] += vote.vote_counts[key])
    )
  })
  return total_votes
}
