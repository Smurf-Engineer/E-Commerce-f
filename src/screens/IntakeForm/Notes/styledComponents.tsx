import styled from 'styled-components'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Search from 'antd/lib/auto-complete'
import { GRAY_DARK, RED, WHITE, GRAY_LIGHTEST, BLUE, GRAY_ANTDESIGN } from '../../../theme/colors'

interface DivProps {
  highlight?: boolean
}

export const Container = styled.div`
  background-color: ${WHITE};
  display: inline-flex;
  flex-direction: column;
  margin-right: 20px;
  flex: 2;

  &:last-child {
    margin: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 28px;
  max-width: 1016px;
  flex-direction: row;
  align-items: flex-start;
  margin: 0 auto;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 4px;
  }
`

export const Label = styled.div`
  display: flex;
  color: ${GRAY_DARK};
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 6px;
  align-items: center;
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

export const Field = styled.div`
  margin-bottom: 20px;
`

export const InfoTitle = styled.div`
  display: flex;
  background-color: ${GRAY_LIGHTEST};
  padding: 10px;
  font-weight: 600;
`

export const ReviewContainer = styled.div`
  border: 1px solid ${GRAY_LIGHTEST};
  display: flex;
  flex-direction: column;
  flex: 1.5;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const DataSelectedContainer = styled.div`
  padding: 10px;
`

export const CheckboxLabel = styled.div`
  display: inline-block;
`

export const CheckBoxContainer = styled.div`
  margin-right: 10px;
  flex: 1.2;
  @media (max-width: 768px) {
    flex: 4;
    & .ant-checkbox-wrapper {
      margin: 0 5px 5px 0;
    }
  }
`

export const Title = styled.div`
  margin-right: 20px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`

export const ProjectInfoContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const LabelContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 8px;
`

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const StyledInput = styled(Input)`
  border: 1px solid ${({ highlight }: DivProps) => highlight ? RED : GRAY_ANTDESIGN};
`

export const QuestionSpan = styled.span`
  height: 24px;
  max-width: 24px;
  width: 100%;
  color: ${GRAY_DARK};
  line-height: 23px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin: 0 7px;
  border: 1px solid ${GRAY_DARK};

  &:hover {
    cursor: pointer;
  }
`

export const MultipleItemsButton = styled.div`
  color: ${BLUE};
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`

export const StyledSearch = styled(Search)`
  width: 100%;
`

export const SearchButton = styled(Button)`
  height: 100%;
  border: none;
  width: 35px;
`