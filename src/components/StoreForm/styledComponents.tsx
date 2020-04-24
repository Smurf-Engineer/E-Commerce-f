/**
 * Styled Components - Created by david on 09/04/18.
 */
import styled from 'styled-components'
import { GRAY_LIGHTEST, GRAY_DARK, RED, BLUE } from '../../theme/colors'
import Icon from 'antd/lib/icon'
import { AVENIR_NEXT } from '../../theme/fonts'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  .modal-info {
    background: red;
  }
`

export const Fields = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`

export const Label = styled.div`
  display: flex;
  color: ${GRAY_DARK};
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 6px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 0;
  }
`

export const Required = styled.div`
  color: ${RED};
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 6px;
`

export const Column = styled.div`
  width: 47%;
  margin-right: 18px;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    margin-bottom: 24px;
  }
`

export const Error = styled.div`
  color: ${RED};
  font-size: 12px;
  line-height: 16px;
  padding: 4px;
`
export const TeamStoreTypeLabel = styled.div`
  border-radius: 2px;
  background-color: ${GRAY_LIGHTEST};
  color: ${GRAY_DARK};
  font-family: Avenir Next;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-align: center;
  height: 42px;
  max-width: 246px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  margin-top: 12px;
  width: 100%;
  padding: 10px;
`

export const RightLabels = styled.div`
  align-self: flex-end;
  text-align: center;
`

export const Question = styled(Icon)`
  margin-top: 2px;
  margin-left: 8px;
  cursor: pointer;
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const InfoBody = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: -38px;
`

export const inputStyle = {
  width: '100%'
}

export const buttonStyle = {
  background: BLUE,
  border: 'none'
}
