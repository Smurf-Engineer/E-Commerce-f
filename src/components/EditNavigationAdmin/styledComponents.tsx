/**
 * Styled Components - Created by carloscazarez on 29/06/19.
 */
import styled from 'styled-components'
import Switch from 'antd/lib/switch'
import { GRAY_LIGHT, BLUE } from '../../theme/colors'

interface StyleProps {
  fontSize?: string
  color?: string
  align?: string
}
export const Container = styled.div``

export const Title = styled.div`
  margin-top: 25px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  padding: 30px 0;
  border-bottom: 1px solid ${({ color }: StyleProps) => color || GRAY_LIGHT};
`

export const ColumnTitle = styled.div`
  font-size: ${({ fontSize }: StyleProps) => fontSize || '14px'};
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  ${({ align }: StyleProps) => (align ? `text-align: ${align};` : GRAY_LIGHT)};
`

export const SportTyle = styled(ColumnTitle)`
  cursor: pointer;
`

export const SwitchWrapper = styled.div`
  .ant-switch-checked {
    background-color: ${BLUE};
  }
`
export const StyledSwitch = styled(Switch)`
  width: 30px;
`
