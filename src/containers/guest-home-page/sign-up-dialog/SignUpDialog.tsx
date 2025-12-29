import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import { signup } from '~/constants'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import { styles } from '~/containers/guest-home-page/sign-up-dialog/SignUpDialog.styles'
import { SignUpForm } from '~/containers/guest-home-page/sign-up-form/SignUpForm'
import { UserRoleEnum } from '~/types'

export interface SignUpDialogProps {
  role: UserRoleEnum
}

export const SignUpDialog: FC<SignUpDialogProps> = ({ role }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='signUp'
          component='img'
          src={role === UserRoleEnum.Tutor ? tutorImg : studentImg}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t(`signup.head.${role}`)}
        </Typography>
        <Box sx={styles.form}>
          <SignUpForm role={role} />
          <GoogleLogin
            buttonWidth={styles.form.maxWidth}
            role={role}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}
