import { Button, Container, Typography } from "@material-ui/core"

const NotFound = () => {
  return (
    <Container
      maxWidth='sm'
      style={{
        height: '100vh',
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography
        variant='h5'
        style={{ marginBottom: '2rem', fontSize: 'calc(1.5vw + 1.5rem)' }}
        align='center'
      >
        This page does not exist
      </Typography>
      <img style={{ width: '100%' }} src='/notfound.svg' alt='not found' />
    </Container>
  )
}

export default NotFound
