/**
 * Styled Components - Created by cazarez on 10/04/18.
 */
import styled from 'styled-components'
import teamstoreImage from '../../assets/uhc_ladies.jpg'

interface StyledProps {
  width: string
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Text = styled.div`
  color: #fff;
`

export const ImageContainer = styled.div`
  width: 100%;
  position: relative;
`

export const SearchBackground = styled.img`
  width: 100%;
`

export const TeamStoreText = styled.div`
  height: 44px;
  color: #ffffff;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;
`
export const SearchContainer = styled.div`
  position: relative;
`

export const ButtonRow = styled.div``
