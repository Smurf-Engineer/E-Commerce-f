/**
 * Styled Components - Created by david on 10/04/18.
 */
import styled from 'styled-components'
import Switch from 'antd/lib/switch'
import Icon from 'antd/lib/icon'
import { BLUE } from '../../theme/colors'

interface ContainerProps {
  infoIcon?: boolean
}

export const Container = styled.div`
  width: 25%;
  margin-right: 10%;
  margin-right: ${({ infoIcon }: ContainerProps) => (!infoIcon ? '10%' : '0')};

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 15px;
  }

  @media (min-width: 481px) and (max-width: 1024px) {
    width: 45%;
  }
`
export const SwitchInput = styled(Switch)`
  &.ant-switch-checked {
    background: ${BLUE};
  }
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

export const Text = styled.div`
  color: #fff;
`

export const Label = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
`

export const Message = styled.div`
  color: #8c8c8c;
  font-size: 14px;
  line-height: 21px;
`

export const SubLabel = styled.div`
  color: #8c8c8c;
  font-size: 12px;
  font-size: 12px;
  margin: 6px 4px 0;
`

export const inputStyle = {
  width: '100%',
  marginTop: 16
}

export const Error = styled.div`
  color: #e61737;
  font-size: 12px;
  line-height: 16px;
  padding: 4px;
`

export const Question = styled(Icon)`
  margin-top: 2px;
  margin-left: 8px;
  cursor: pointer;
`
