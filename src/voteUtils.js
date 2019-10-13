export const fixJson = votes => {
  const ignored_groups = ['Oppositioryhmät', 'Hallitusryhmät']

  const votes_distribution = votes.map(vote => {
    const jsonData = JSON.parse(vote.distribution.replace(/'/g, '"'))
    const filteredDist = jsonData.distr.filter(
      dist => !ignored_groups.includes(dist.group)
    )
    return { ...vote, distribution: filteredDist }
  })

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
