/**
 * Styled Components - Created by gustavomedina on 23/03/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
`

export const MessagesList = styled.section`
  padding: 5px 5px 0 0;
`

export const NewMessage = styled.section`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 5px;
  margin-right: 0px;
  border-top: 1px solid #3f3f3f;
`

export const Sidebar = styled.aside`
  grid-area: sidebar;
  padding: 5px 5px 0 0;
  border-left: 1px solid #3f3f3f;
  height: 100%;
`

export const Main = styled.section`
  grid-area: main;
`

export const StyledLoginButton = styled(Button)`
  border-radius: 0px;
  width: 100%;
  height: 50px;
  border-color: #e61737;
  background-color: #fff;
  margin-bottom: 10px;
`
