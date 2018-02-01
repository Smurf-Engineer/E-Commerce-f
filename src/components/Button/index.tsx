import * as React from 'react'
import Button from 'antd/lib/button'

interface Props {
  label: string
  onClick?: () => void
}

const MyButton = ({ label, onClick }: Props) => {
  return (
    <Button type="primary" {...{ onClick }}>
      {label}
    </Button>
  )
}

export default MyButton
