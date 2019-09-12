/**
 * Styled Components - Created by Jesús Apodaca on 13/06/19.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import { GRAY } from '../../../../../theme/colors'

interface DivProps {
  capitalize?: boolean
  upperCase?: boolean
  inline?: boolean
  marginTop?: string
  big?: boolean
  maxWidth?: boolean
  marginBottom?: string
}

export const Text = styled.div`
  color: #fff;
`

export const Container = styled.div`
  margin-bottom: 30px;
  max-width: 1024px;
`

export const Label = styled.div`
  margin-top: ${({ marginTop }: DivProps) => (marginTop ? marginTop : 'unset')};
  margin-bottom: ${({ marginBottom }: DivProps) =>
    marginBottom ? marginBottom : '10px'};
  text-transform: ${({ upperCase }: DivProps) =>
    upperCase ? 'uppercase' : 'unset'};
`

export const ImageBlock = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 8px;
`

export const UploadContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  position: relative;
`

export const StyledIcon = styled(Icon)`
  width: 18px;
  right: 22px;
  top: 14px;
  position: absolute;
  z-index: 2;
  cursor: pointer;
  color: white;
  filter: drop-shadow(0px 0px 2px ${GRAY});
`
