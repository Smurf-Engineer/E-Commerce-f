/**
 * Styled Components - Created by eduardoquintero on 25/07/18.
 */
import styled from 'styled-components'
import Switch from 'antd/lib/switch'
import { GRAY_DARK, RED } from '../../../theme/colors'

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 35em;
`

export const Container = styled.div``

export const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  cursor: pointer;

  &:hover {
    color: ${RED};
  }
`
export const ScreenContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 64px;
  margin-top: 48px;
  padding-right: 34px;
  flex-direction: column;

  @media (max-width: 768px) and (min-width: 320px) {
    align-items: center;
    margin-bottom: 24px;
    padding-right: 0px;
  }
`
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-transform: uppercase;
`

export const TeamStoreInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`

export const InformationContainer = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`

export const Header = styled.p`
  font-weight: 600;
  font-size: 17px;
`

export const Text = styled.p`
  font-size: 17px;
`

export const StyledSwitch = styled(Switch)`
  max-width: 44px;
`
