/**
 * Styled Components - Created by eduardoquintero on 15/07/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import { RED, GRAY_DARK, BLUE_LIGHTEST } from '../../../../theme/colors'

export const Container = styled.tr``

interface CellProps {
  color?: string
  textAlign?: string
}

export const Cell = styled.td`
  border-bottom: 1px solid #d7d7d7;
  text-align: left;
  padding: 8px 0;
  color: ${({ color }: CellProps) => (color ? color : GRAY_DARK)};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 35px;
  text-align: ${({ textAlign }: CellProps) =>
    textAlign ? textAlign : 'start'};
  &.error {
    color: ${RED};
  }
  @media (min-width: 331px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
  }

  @media (max-width: 330px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
  }
`

interface ImagePreviewProps {
  src: string
}

export const Thumbnail = styled.div`
  background-image: url(${({ src }: ImagePreviewProps) => src || ''});
  background-color: ${BLUE_LIGHTEST};
  height: 90px;
  width: 90px;
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const HeavyText = styled.p`
  margin-bottom: 10px;
  font-weight: 600;
  line-height: 20px;
  font-size: 17px;
`

export const RegularText = styled.p`
  margin-bottom: 5px;
  line-height: 20px;
`

export const StyledInput = styled(Input)`
  border-radius: 0;
  width: 55px;
`
