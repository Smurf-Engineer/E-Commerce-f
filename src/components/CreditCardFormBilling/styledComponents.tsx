/**
 * Styled Components - Created by miguelcanobbio on 16/05/18.
 */
import styled from 'styled-components'
import Checkbox from 'antd/lib/checkbox'
import { GRAY_DARK, BLUE } from '../../theme/colors'

export const Container = styled.div`
  width: 100%;
`

export const ContainerBilling = styled.div`
  margin-bottom: 24px;
  margin-top: 16px;
`

export const StyledCheckbox = styled(Checkbox)`
  color: ${GRAY_DARK};
  font-size: 16px;
  height: 36px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;

  .ant-checkbox-wrapper:hover,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${BLUE};
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: ${BLUE};
  }
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin: 24px 0;
`

export const MyCardsRow = styled.div`
  margin-bottom: 20px;
`
