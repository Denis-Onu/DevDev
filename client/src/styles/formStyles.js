import { makeStyles } from '@material-ui/core'

const formStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  card: {
    marginTop: '10vh'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 15
  },
  input: {
    margin: theme.spacing(2, 0, 2, 0)
  },
  button: {
    marginTop: theme.spacing(2)
  },
  link: {
    marginTop: 10
  }
}))

export default formStyles