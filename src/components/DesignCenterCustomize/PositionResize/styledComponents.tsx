/**
 * Styled Components - Created by Jesús Apodaca on 21/02/20.
 */
import styled from 'styled-components'
import InputNumber from 'antd/lib/input-number'
import Icon from 'antd/lib/icon'
import { GRAY_DARK, RED, GRAY, GRAY_LIGHTEST } from '../../../theme/colors'

interface IconProps {
  invert?: boolean
  enabled?: boolean
}

interface DivProps {
  maxWidth?: boolean
  alignStart?: boolean
  noMargin?: boolean
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
  .ant-input-number-handler-wrap {
    opacity: 1;
  }
`

export const InputContainer = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const InputBlock = styled.div`
  display: flex;
  flex-flow: column;
  margin-right: ${({ noMargin }: DivProps) => (noMargin ? '0' : '20px')};
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 130px;
  width: 100%;
  &:last-child {
    margin-right: 0px;
  }
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
  margin: 16px 5px 0;
  cursor: pointer;
  font-size: 12px;
  color: ${({ enabled }: IconProps) => (enabled ? RED : GRAY)};
`

export const MirrorButton = styled.img`
  max-width: 38px;
  height: 39px;
  margin-top: 3px;
  padding: 8px;
  border: 1px solid ${GRAY};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${GRAY_LIGHTEST};
  }
`
