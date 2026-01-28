import { styles } from '~/containers/card-item/CardItem.styles'
import { Box, SvgIconProps } from '@mui/material'
import * as MaterialIcons from '@mui/icons-material'

type IconTheme = {
  bg: string
  color: string
}

interface CardItemInterface {
  icon: string | null
  id: string | null
  name: string | null
  offers: number | null
  theme: IconTheme
  onCardSelect: (name: string | null) => void
}

interface MyIconProps {
  name: string | null
  color?: string
}

const MyIcon = ({ name, color, ...props }: MyIconProps) => {
  if (!name) return null

  const iconName: string = name.replace(/Icon$/, '')
  const IconComponent = MaterialIcons[
    iconName
  ] as React.ComponentType<SvgIconProps>

  return IconComponent ? (
    <IconComponent htmlColor={color} {...props}></IconComponent>
  ) : null
}

const CardItem = ({
  name,
  icon,
  offers,
  theme: { bg, color },
  onCardSelect,
  id
}: CardItemInterface) => {
  return (
    <Box onClick={() => onCardSelect(id)} sx={styles.cardItem}>
      <Box
        sx={{
          width: 62,
          height: 62,
          gap: 24,
          bgcolor: bg,
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          ...styles.icon
        }}
      >
        <MyIcon color={color} name={icon} />
      </Box>

      <Box>
        <Box style={styles.title}>{name}</Box>
        <Box style={styles.offers}>{offers} Offers</Box>
      </Box>
    </Box>
  )
}

export default CardItem
