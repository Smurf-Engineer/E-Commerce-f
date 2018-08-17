import * as React from 'react'
import { Container, Text } from './styledComponents'

interface Props {
    message: string
}

const EmptyContainer = ({ message }: Props) => {
    return (
        <Container>
            <Text>{message}</Text>
        </Container>
    )
}

export default EmptyContainer