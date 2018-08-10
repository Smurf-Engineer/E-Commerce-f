/**
 * Styled Components - Created by cazarez on 10/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'

export const Container = styled.div``

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin: 6px 0;
`

export const ItalicText = styled.div`
  width: 128px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  font-style: italic;
  margin-top: 8px;
`

export const StyledCheckbox = styled(Checkbox)`
  height: 22px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;

  .ant-checkbox-wrapper:hover,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #4a90e2;
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: #4a90e2;
  }
`

export const StyledButton = styled(Button)`
  height: 40px;
  width: 138.23px;
  border: 1px solid #dcdcdc;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
`

export const EditButton = styled(Button)`
  height: 40px;
  width: 138.23px;
  border: 1px solid #4a90e2;
  background-color: #4a90e2;
  color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  margin 8px 0;

  &:hover {
    color: #4a90e2;
    background-color: #fff;
    border-color: #4a90e2;
  }
`

export const SecondaryButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`
