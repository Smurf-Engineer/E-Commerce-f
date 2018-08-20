/**
 * Styled Components - Created by cazarez on 07/05/18.
 */
import styled from 'styled-components'
import Checkbox from 'antd/lib/checkbox'

export const Container = styled.div`
  padding-top: 30px;
  min-height: 60vh;

  @media (max-width: 768px) {
    min-height: 45vh;
  }
`

export const Text = styled.div`
  color: #fff;
`
export const Title = styled.div`
  height: 22px;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const ShippingMethodContainer = styled.div`
  margin-bottom: 20px;
`

export const ShippinPriorityText = styled.div`
  height: 46px;
  width: 281px;
  color: #5f6062;
  font-size: 16px;
  font-style: italic;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin: 23px 0 20px;
`

export const StyledCheckbox = styled(Checkbox)`
  height: 22px;
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;
`

export const ViewAllAddresses = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  cursor: pointer;
`
