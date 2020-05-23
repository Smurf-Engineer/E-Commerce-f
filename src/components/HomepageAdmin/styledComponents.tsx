/**
 * Styled Components - Created by eduardoquintero on 30/05/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import { RED, WHITE, WHITE_TRANSPARENT, GRAY_SKELETON } from '../../theme/colors'
import Button from 'antd/lib/button'

const Search = Input.Search

export const Container = styled.div`
  padding-bottom: 36px;
  width: 100%;
`
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const SearchInput = styled(Search)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0;
  margin-left: 4px;
  width: 500px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
  }
`

export const SpinContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Goback = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 40px;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const MediaSection = styled.div`
  display: inline-flex;
  flex-flow: column;
  justify-content: flex-start;
  max-width: 850px;
  width: 100%;
  flex-wrap: wrap;
`

export const RowInput = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
  flex-flow: column;
`

export const Buttons = styled.div`
`

export const AddButton = styled.div`
  height: 50px;
  width: 223px;
  border: 2px solid ${RED};
  border-radius: 2px;
  background-color: ${WHITE};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${RED};
  margin-right: 24px;
  margin-top: 22px;
  cursor: pointer;
  transition: all .25s;
  &:hover {
    color: ${WHITE};
    background: ${RED};
  }
`

export const Label = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 2;
  background: ${WHITE_TRANSPARENT};
`

export const SaveSection = styled.div`
  margin-top: 18px;
  margin-bottom: 28px;
  display: flex;
  padding: 18px;
  border-bottom: 1px solid ${GRAY_SKELETON};
  justify-content: flex-end;
  align-items: center;
`

export const SaveButton = styled(Button)``