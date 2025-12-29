import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import learnImg from '~/assets/img/guest-home-page/learnImg.png'
import teachImg from '~/assets/img/guest-home-page/teachImg.png'
import InfoCard from '~/components/info-card/InfoCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { SignUpDialog } from '~/containers/guest-home-page/sign-up-dialog/SignUpDialog'
import { styles } from '~/containers/guest-home-page/styles/WhatCanYouDo.styles'
import { useModalContext } from '~/context/modal-context'

import { guestRoutes } from '~/router/constants/guestRoutes'

import { UserRoleEnum } from '~/types'

const cardData = [
  {
    img: learnImg,
    title: 'guestHomePage.whatCanYouDo.learn.title',
    description: 'guestHomePage.whatCanYouDo.learn.description',
    actionLabel: 'guestHomePage.whatCanYouDo.learn.actionLabel',
    actionType: UserRoleEnum.Student
  },
  {
    img: teachImg,
    title: 'guestHomePage.whatCanYouDo.teach.title',
    description: 'guestHomePage.whatCanYouDo.teach.description',
    actionLabel: 'guestHomePage.whatCanYouDo.teach.actionLabel',
    actionType: UserRoleEnum.Tutor
  }
]

const WhatCanYouDo = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const openRegistrationDialog = (role: UserRoleEnum) => {
    openModal({ component: <SignUpDialog role={role} /> })
  }

  const cards = cardData.map((item) => (
    <InfoCard
      action={() => openRegistrationDialog(item.actionType)}
      actionLabel={t(item.actionLabel)}
      cardWidth={460}
      description={t(item.description)}
      img={item.img}
      key={item.title}
      title={t(item.title)}
    />
  ))

  return (
    <Box id={guestRoutes.navBar.whatCanYouDo.route}>
      <TitleWithDescription
        description={t('guestHomePage.whatCanYouDo.description')}
        style={styles.titleWithDescription}
        title={t('guestHomePage.whatCanYouDo.title')}
      />

      <Box sx={styles.cards}>{cards}</Box>
    </Box>
  )
}

export default WhatCanYouDo
