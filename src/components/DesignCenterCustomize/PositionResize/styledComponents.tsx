/**
 * Styled Components - Created by Jesús Apodaca on 21/02/20.
 */
import styled from 'styled-components'
import InputNumber from 'antd/lib/input-number'
import Icon from 'antd/lib/icon'
import { GRAY_DARK, RED, GRAY } from '../../../theme/colors'

interface IconProps {
  invert?: boolean
  enabled?: boolean
}

interface DivProps {
  maxWidth?: boolean
  alignStart?: boolean
}

export const Container = styled.div`
  margin: 0px 32px;
  padding: 12px 2px;
  margin-bottom: 28px;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const NumberInput = styled(InputNumber)`
  width: 100%;
  margin-top: 4px;
`

export const InputContainer = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: ${({ alignStart }: DivProps) =>
    alignStart ? 'flex-start' : 'space-between'};
`

export const InputBlock = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: ${({ maxWidth }: DivProps) => (maxWidth ? '94px' : '74px')};
  width: 100%;
`

export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 12px;
`

export const SmallIcon = styled(Icon)`
  font-size: 14px;
  margin-left: 4px;
  transform: rotate(
    ${({ invert }: IconProps) => (invert ? '-45deg' : '45deg')}
  );
`

export const LockIcon = styled(Icon)`
  margin: 16px 4px 0;
  cursor: pointer;
  font-size: 12px;
  color: ${({ enabled }: IconProps) => (enabled ? RED : GRAY)};
`
