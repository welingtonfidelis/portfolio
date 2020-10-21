import { Fade, LinearProgress } from '@material-ui/core'

export default function Load(props) {
  const { loading } = props;

  return (
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? '10ms' : '10ms',
        }}
      >
        <LinearProgress color="secondary" />
      </Fade>
  )
}