import React, { useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import { InputBase, Button } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}))

const ApplicationBar = props => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [searchFilter, setSearchFilter] = useState(
    queryParams.get('search') || ''
  )

  const handleSearchChange = e => setSearchFilter(e.target.value)

  const handleSearchSubmit = e => {
    if (searchFilter.length >= 2) {
      history.push('/vote?search=' + searchFilter)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Track-your-parliament
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon onClick={handleSearchSubmit} />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchFilter}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  handleSearchSubmit(e)
                }
              }}
            />
          </div>
          <Button
            variant="outlined"
            color="secondary"
            disabled={searchFilter.length < 2}
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  )
}

export default ApplicationBar
