import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { useModalContext } from '~/context/modal-context'
import { guestRoutes } from '~/router/constants/guestRoutes'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import GoogleButton from '~/containers/guest-home-page/google-button/GoogleButton'

import { styles } from '~/containers/guest-home-page/google-login/GoogleLogin.styles'
import { SignUpDialog } from '~/containers/guest-home-page/sign-up-dialog/SignUpDialog'
import { UserRoleEnum } from '~/types'

const GoogleLogin = ({ type, buttonWidth, role }) => {
  const { t } = useTranslation()
  const { whatCanYouDo } = guestRoutes.navBar
  const { openModal, closeModal } = useModalContext()

  const openLoginDialog = () => {
    closeModal()
    setTimeout(() => openModal({ component: <LoginDialog /> }), 0)
  }

  const openRegistrationDialog = () => {
    openModal({ component: <SignUpDialog role={UserRoleEnum.Tutor} /> })
  }

  return (
    <Box>
      <Box sx={styles.linesBox}>
        <Typography sx={styles.continue} variant='body2'>
          {t(`${type}.continue`)}
        </Typography>
      </Box>

      <GoogleButton
        buttonWidth={buttonWidth}
        role={role}
        route={whatCanYouDo.path}
        type={type}
      />
      <Box sx={styles.haveAccount}>
        <Typography sx={{ pr: 1 }} variant='body2'>
          {t(`${type}.haveAccount`)}
        </Typography>

        {type === 'signup' ? (
          <Typography
            onClick={openLoginDialog}
            sx={styles.underlineText}
            variant='body2'
          >
            {t('signup.joinUs')}
          </Typography>
        ) : (
          <Typography
            onClick={openRegistrationDialog}
            sx={styles.underlineText}
            variant='body2'
          >
            {t('login.joinUs')}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default GoogleLogin
