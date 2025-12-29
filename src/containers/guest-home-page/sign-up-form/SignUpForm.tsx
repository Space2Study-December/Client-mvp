import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import info from '~/assets/img/guest-home-page/info.svg'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import { snackbarVariants } from '~/constants'
import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
import { styles } from '~/containers/guest-home-page/sign-up-form/SignUpForm.styles'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import useForm from '~/hooks/use-form'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useAppSelector } from '~/hooks/use-redux'
import { useSignUpMutation } from '~/services/auth-service'
import { SignupParams, UserRoleEnum } from '~/types'
import {
  agreement,
  confirmPassword,
  email,
  firstName,
  lastName,
  password
} from '~/utils/validations/auth'

export interface SignUpFormProps {
  role: UserRoleEnum
}

interface SignUpFormData extends SignupParams {
  agreement: boolean
}

export const SignUpForm: FC<SignUpFormProps> = ({ role }) => {
  const { setAlert } = useSnackBarContext()
  const { closeModal, openModal } = useModalContext()
  const { t } = useTranslation()
  const [signupUser] = useSignUpMutation()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } =
    useForm<SignUpFormData>({
      onSubmit: async () => {
        try {
          await signupUser(data).unwrap()
          closeModal()
          openModal(
            {
              component: (
                <NotificationModal
                  description={`${t('signup.confirmEmailMessage')}${data.email}${t('signup.confirmEmailDesc')}`}
                  img={info}
                  title={t('signup.confirmEmailTitle')}
                />
              )
            },
            5000
          )
        } catch (e) {
          const error = e as { data: { code: string } }
          if (error?.data?.code) {
            setAlert({
              severity: snackbarVariants.error,
              message: `errors.${error.data.code}`
            })
          }
        }
      },
      initialValues: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        agreement: false,
        role
      },
      validations: {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        agreement
      }
    })

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)

  const { authLoading } = useAppSelector((state) => state.appMain)

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <AppTextField
          autoFocus
          data-testid={'firstName'}
          errorMsg={t(errors.firstName)}
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleInputChange('firstName')}
          required
          sx={{ mb: '5px' }}
          value={data.firstName}
        />

        <AppTextField
          data-testid={'lastName'}
          errorMsg={t(errors.lastName)}
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleInputChange('lastName')}
          required
          sx={{ mb: '5px' }}
          value={data.lastName}
        />
      </Box>

      <AppTextField
        data-testid={'email'}
        errorMsg={t(errors.email)}
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleInputChange('email')}
        required
        sx={{ mb: '5px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleInputChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.confirmPassword)}
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleInputChange('confirmPassword')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />

      <FormControlLabel
        control={<Checkbox onChange={handleInputChange('agreement')} />}
        label={t('signup.iAgree')}
        value={data.agreement}
      />

      <AppButton loading={authLoading} sx={styles.signUpButton} type='submit'>
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}
