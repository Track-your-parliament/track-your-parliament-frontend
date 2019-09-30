import { DateTime } from 'luxon'
import shortid from 'shortid'

export const sortByDate = data =>
  data.sort((a, b) =>
    DateTime.fromSQL(a.created) > DateTime.fromSQL(b.created) ? -1 : 1
  )

export const aggregateByDay = data => {
  const result = []
  const dates = [
    ...new Set(data.map(item => DateTime.fromSQL(item.created).toISODate())),
  ].sort((a, b) => (DateTime.fromISO(a) > DateTime.fromISO(b) ? -1 : 1))
  dates.forEach(date => {
    const sameDateItems = data.filter(
      item => date === DateTime.fromSQL(item.created).toISODate()
    )
    result.push({
      id: shortid.generate(),
      created: date,
      keywords: sameDateItems
        .reduce((p, c) => {
          p.push(...c.keywords)
          return p
        }, [])
        .sort((a, b) => a.tfidf - b.tfidf),
      documents: sameDateItems
        .reduce((p, c) => {
          p.push({
            id: c.id,
            title: c.title,
            Votes: c.Votes,
            created: c.created,
          })
          return p
        }, [])
        .sort((a, b) => a.tfidf - b.tfidf),
    })
  })
  return result
}

export const aggregateByMonth = data => {
  const result = []
  const dates = [
    ...new Set(
      data.map(item => DateTime.fromSQL(item.created).toFormat('y-LL'))
    ),
  ].sort((a, b) => (DateTime.fromISO(a) > DateTime.fromISO(b) ? -1 : 1))
  dates.forEach(date => {
    const sameDateItems = data.filter(
      item => date === DateTime.fromSQL(item.created).toFormat('y-LL')
    )
    result.push({
      id: shortid.generate(),
      created: date,
      keywords: sameDateItems
        .reduce((p, c) => {
          p.push(...c.keywords)
          return p
        }, [])
        .sort((a, b) => a.tfidf - b.tfidf),
      documents: sameDateItems
        .reduce((p, c) => {
          p.push({
            id: c.id,
            title: c.title,
            Votes: c.Votes,
            created: c.created,
          })
          return p
        }, [])
        .sort((a, b) => a.tfidf - b.tfidf),
    })
  })
  return result
}

export const aggregateByYear = data => {
  const result = []
  const dates = [
    ...new Set(data.map(item => DateTime.fromSQL(item.created).toFormat('y'))),
  ].sort((a, b) => (DateTime.fromISO(a) > DateTime.fromISO(b) ? -1 : 1))
  dates.forEach(date => {
    const sameDateItems = data.filter(
      item => date === DateTime.fromSQL(item.created).toFormat('y')
    )
    result.push({
      id: shortid.generate(),
      created: date,
      keywords: sameDateItems
        .reduce((p, c) => {
          p.push(...c.keywords)
          return p
        }, [])
        .sort((a, b) => a.tfidf - b.tfidf),
      documents: sameDateItems
        .reduce((p, c) => {
          p.push({
            id: c.id,
            title: c.title,
            Votes: c.Votes,
            created: c.created,
          })
          return p
        }, [])
        .sort((a, b) => a.tfidf - b.tfidf),
    })
  })
  return result
}
