import Box from '@mui/material/Box'
import { SxProps } from '@mui/system'
import { FC, ReactNode } from 'react'

import { styles } from '~/components/img-title-description/ImgTitleDescription.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

interface ImgTitleDescriptionProps {
  img?: string
  title: string
  description?: string | ReactNode
  style?: {
    [key: string]: SxProps
  }
}

const ImgTitleDescription: FC<ImgTitleDescriptionProps> = ({
  img,
  title,
  description,
  style = styles
}) => {
  return (
    <Box sx={style.root}>
      <Box alt='info' component={'img'} src={img} sx={style.img} />

      <TitleWithDescription
        description={description}
        style={style.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default ImgTitleDescription
