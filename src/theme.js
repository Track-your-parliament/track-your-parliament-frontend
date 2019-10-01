import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#18447e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

export const timelineStyles = {
  default: {
    content: {
      padding: 0,
      background: 'none',
      border: 'none',
      boxShadow: 'none',
      color: '#fff',
    },
    arrow: {
      borderRight: 'none',
    },
    icon: {
      background: '#18447e',
      cursor: 'pointer',
      boxShadow:
        '0 0 0 4px #000, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)',
    },
  },
  alternative: {
    icon: {
      background: '#18447e',
      boxShadow:
        '0 0 0 4px #000, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)',
    },
  },
}
