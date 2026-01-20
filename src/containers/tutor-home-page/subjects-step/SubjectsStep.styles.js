import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: { xs: 'flex-start', md: 'space-between' },
    gap: '40px',
    flexDirection: { xs: 'column', md: 'row' },
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', md: '0px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: { xs: 'none', md: 1 },
    maxWidth: { xs: 'none', md: '432px' },
    pb: { xs: '16px', md: '52px' }
  },
  img: {
    width: { xs: '180px', md: '100%' },
    m: { sm: 0, xs: '0 auto' }
  },
  rigthBox: {
    width: '100%',
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  description: {
    mb: '20px'
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    mb: 'auto'
  },
  subjectsChips: {
    flexWrap: 'wrap',
    rowGap: '10px',
    columnGap: '4px',
    maxHeight: { md: '100px' },
    overflowY: { md: 'auto' },
    mb: '20px'
  }
}
