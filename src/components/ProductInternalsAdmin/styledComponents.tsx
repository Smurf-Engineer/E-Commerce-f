/**
 * Styled Components - Created by eduardoquintero on 03/07/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { GRAY_LIGHTEST } from '../../theme/colors'

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
  width: 500px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 50px;
  }
`

export const AddInternalButton = styled(Button)`
  height: 50px;
  border: 2px solid #e61737;
  border-radius: 2px;
  background-color: #ffffff;
  color: #e61737;
  margin-right: 22px;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`

export const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding-right: 32px;
`

export const UploadButton = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #e61737;
  padding: 5px 12px;
  color: #e61737;
  font-size: 16px;
  height: 50px;
  width: 140px;
  vertical-align: middle;
  margin-bottom: 4px;
  margin-right: 22px;
  cursor: pointer;
`

export const CsvLoader = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 140px;
  vertical-align: middle;
`

export const DownloadButton = styled(Button)`
  background-color: ${({ disabled }: any) =>
    disabled ? `${GRAY_LIGHTEST} !important` : ''};
  border-color: ${({ disabled }: any) =>
    disabled ? `${GRAY_LIGHTEST} !important` : ''};
`
