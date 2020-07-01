/**
 * Styled Components - Created by Jesús Apodaca on 30/06/20.
 */
import styled from 'styled-components'
import Switch from 'antd/lib/switch'
import { WHITE_TRANSPARENT, BLUE, GRAY_DARK } from '../../theme/colors'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 320px) and (max-width: 768px) {
    padding: 24px 0;
  }
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 24px;
`

export const LoadingErrorContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`

export const ErrorMessage = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const StyledSwitch = styled(Switch)`
  margin-left: 24px;
`

export const SwitchWrapper = styled.div`
  justify-content: center;
  align-items: center;
  font-weight: bold;
  display: flex;
`

export const LoadingContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10000;
  height: 100vh;
  background: ${WHITE_TRANSPARENT};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StatusLabel = styled.div`
  margin-top: 8px;
  color: ${BLUE};
  font-style: italic;
`

export const AccountLabel = styled.div`
  margin-top: 8px;
  color: ${GRAY_DARK};
`