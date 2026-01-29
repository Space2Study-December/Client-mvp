import React from 'react'
import { styles } from './ParametrizedText.styles'
import Container from '@mui/material/Container'

type Params = {
  [key: string]: React.ReactNode
}

type Props = {
  text: string
  components: Params
}

export function ParametrizedText({ text, components }: Props) {
  const parts = text.split(/(\{[^}]+\})/g)

  return (
    <Container sx={styles.text}>
      {parts.map((part, i) => {
        const match = part.match(/\{([^}]+)\}/)
        if (match) {
          const key = match[1]
          return (
            <React.Fragment key={i} sx={styles.link}>
              {components[key]}
            </React.Fragment>
          )
        }
        return part
      })}
    </Container>
  )
}
