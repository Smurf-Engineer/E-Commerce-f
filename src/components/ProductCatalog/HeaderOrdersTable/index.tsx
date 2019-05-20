/**
 * HeaderOrdersTable Component - Created by miguelcanobbio on 16/07/18.
 */
import * as React from 'react'
import { Header } from './styledComponents'

interface Props {
  label: string
  justifyContent?: string
}

const HeaderOrdersTable = ({ label, justifyContent }: Props) => (
  <Header {...{ justifyContent }}>{label}</Header>
)

export default HeaderOrdersTable
