import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'
import AppButton from '~/components/app-button/AppButton'

import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import { styles } from '~/containers/guest-home-page/notification-modal/NotificationModal.styles'

interface ConfirmEmailModal {
  title: string
  img: string
  description?: ReactNode
  buttonTitle?: string
  onClose?: () => void
}

const NotificationModal: FC<ConfirmEmailModal> = ({
  description,
  buttonTitle,
  title,
  img,
  onClose
}) => {
  return (
    <Box sx={styles.root}>
      <ImgTitleDescription
        description={description}
        img={img}
        style={styles.imgTitleDesc}
        title={title}
      />
      {buttonTitle && <AppButton onClick={onClose}>{buttonTitle}</AppButton>}
    </Box>
  )
}

export default NotificationModal
