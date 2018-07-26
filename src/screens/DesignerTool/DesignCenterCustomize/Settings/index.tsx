/**
 * Settings Component - Created by david on 26/07/18.
 */
import * as React from 'react'
import InspirationItem from '../InspirationColors'
import { Container } from './styledComponents'
import { DesignConfig } from '../../../../types/common'

interface Props {
  designs: DesignConfig[]
  uploadingThumbnail: number
  onSelectPalette: (index: number) => void
  onSelectComplexity: (desing: number, complexity: number) => void
  onUpdateStyleName: (desing: number, name: string) => void
  onSaveThumbnail: (desing: number, item: number, colors: string[]) => void
}

const Settings = ({
  designs,
  onSelectPalette,
  onSelectComplexity,
  onUpdateStyleName,
  onSaveThumbnail,
  uploadingThumbnail
}: Props) => {
  return (
    <Container>
      <InspirationItem
        index={0}
        design={designs[0] || {}}
        {...{
          onSelectPalette,
          onSelectComplexity,
          onUpdateStyleName,
          onSaveThumbnail,
          uploadingThumbnail
        }}
      />
    </Container>
  )
}

export default Settings
