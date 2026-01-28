const link = {
  color: 'primary.900',
  textDecoration: 'none',
  typography: 'caption',
  whiteSpace: 'nowrap',
  display: 'block',
  align: 'center'
}

export const styles = {
  root: {
    // py: 4
    px: { xs: 3, sm: 0 },
    py: { xs: 2, sm: 4 },
    padding: '30px 0 34px'
  },
  separator: {
    width: '4px',
    height: '4px',
    borderRadius: '4px',
    mx: '4px',
    backgroundColor: 'primary.400'
  },
  link,
  previous: {
    ...link,
    fontWeight: '500'
  },
  breadCrumbs: {
    '& ol': {
      flexWrap: 'nowrap',
      overflowX: 'auto',
      '&::-webkit-scrollbar': { display: 'none' }
    }
  }
}
