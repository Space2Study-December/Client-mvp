export const styles = {
  cardItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '360px',
    height: '112px',
    boxSizing: 'border-box',
    background: '#ffffff',
    padding: '25px',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0px 3px 16px 2px #90A4AE8F'
    }
  },
  icon: {
    marginLeft: '10px'
  },
  title: {
    color: 'blue grey/900',
    fontWeight: 500,
    fontFamily: 'Rubik',
    fontSize: '20px',
    lineHeight: '28px',
    letterSpacing: '0.15px',
    verticalAlign: 'middle'
  },
  offers: {
    fontFamily: 'Rubik',
    fontWeight: 400,
    fontsize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25%',
    verticalAlign: 'middle',
    color: '#666',
    fontSize: '14px'
  }
}
