export const styles = {
  box: {
    boxSizing: 'border-box',
    display: 'flex',
    // flexDirection: 'row',
    backgroundColor: '#fff',
    width: 1128,
    height: 706,
    // maxWidth: '95vw',
    // maxHeight: '90vh',
    alignItems: 'center',
    // maxWidth: '90vw',
    margin: { xs: '0 auto', sm: 0 },

    // textAlign: 'center',
    boxShadow: 'none',
    borderRadius: '8px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    gap: 20,
    transform: 'translate(-50%, -50%)'
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: { xs: 4, sm: '70px 90px' }
  },
  icon: {
    position: 'absolute',
    top: 30,
    right: 30,
    width: 48,
    height: 48,
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px', // якщо поруч є текст чи іконка - буде відступ
    color: 'grey.700', // можна змінити колір під дизайн
    backgroundColor: 'transparent', // фон прозорий
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)' // легкий ховер ефект
    }
  },
  imageWrapper: {
    flex: '0 0 45%',
    display: { xs: 'none', md: 'block' } // ховаємо на мобілках
  },
  contentWrapper: {
    width: { xs: '90vw', md: 400 },
    boxSizing: 'border-box',
    minWidth: 400,
    maxWidth: 400,
    // width: '400px',
    height: '566px',
    // flex: '1 1 55%',
    // display: 'flex',
    // flexDirection: 'column',
    gap: 16
  },
  fieldsWrapper: {
    height: 525,
    gap: 4
  },
  title: {
    height: 41,
    fontSize: 35,
    fontWeight: 500,
    letterSpacing: '0.0025em',
    lineHeight: '100%',
    color: '#465969', // темно-сірий
    mb: 1
  },
  description: {
    font: 'Body1 Rubik 400',
    height: 96,
    fontSize: 16,
    color: '#667a8a', // сірий текст
    mb: 3,
    lineHeight: '24px',
    letterSpacing: '0.75px'
  },
  fieldLabel: {
    color: '#607D8B',
    fontSize: 14,
    font: 'Rubik 400',
    lineHeight: '20px',
    letterSpacing: '0.0025em'
  },
  textField: {
    mb: 2,
    '& .MuiInputBase-root': {
      backgroundColor: '#fafafa'
    }
  },
  categoryInput: {
    gap: 4,
    mb: 2
  },
  textArea: {
    gap: 4,
    mb: 1,
    '& .MuiInputBase-root': {
      backgroundColor: '#fafafa'
    }
  },
  charCount: {
    fontSize: 12,
    color: '#a1aebf',
    textAlign: 'right'
  },
  buttonWrapper: {
    mt: 3,
    display: 'flex',
    justifyContent: 'flex-start' // кнопка зліва, як у тебе на скрині
  },
  button: {
    backgroundColor: '#1f2a3d',
    color: '#fff',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 10px rgba(24,37,63,0.25)',
    '&:hover': {
      backgroundColor: '#1a2435',
      boxShadow: '0 6px 14px rgba(24,37,63,0.3)'
    }
  }
}
