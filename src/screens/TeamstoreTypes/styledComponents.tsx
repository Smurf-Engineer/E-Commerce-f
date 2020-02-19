/**
 * Styled Components - Created by eduardoquintero on 18/02/20.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import {
  BLACK,
  WHITE,
  GRAY_LIGHTEST,
  GRAY_LIGHT,
  RED
} from '../../theme/colors'

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 50px;
  flex-direction: column;
  background: ${WHITE};
`

export const Title = styled.p`
  margin: 40px 0;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${WHITE};
  height: 400px;
  width: 300px;
  &:last-child {
    margin-left: 30px;
  }
  border: 1px solid ${GRAY_LIGHT};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  position: relative;
`

export const CardTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  color: ${BLACK};
  background: ${GRAY_LIGHTEST};
  text-align: center;
  padding: 10px;
`

export const TeamStoreCardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const List = styled.ul``

export const Item = styled.li`
  margin-bottom: 10px;
`

export const PaymentIcons = styled.div`
  display: flex;
  margin-left: 30px;
`

export const Icon = styled.img`
  margin-right: 10px;
`

export const SelectTeamStoreButton = styled(Button)`
  height: 40px;
  border: 2px solid ${RED};
  border-radius: 2px;
  background-color: ${WHITE};
  color: ${RED};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
  width: 200px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom 40px;
`
