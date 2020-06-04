/**
 * CartListItemAdmin Component - Created by eduardoquintero on /05/19.
 */
import * as React from 'react'
import {
  DesignInfoContainer,
  DesignInfoTitle,
  DesignInfoSubtitle,
  DesignInfoBox,
  NamesContainer
} from './styledComponents'
import messages from '../../ProductInfo/messages'

interface Props {
  cartItem: any
  formatMessage: (messageDescriptor: any) => string
}

class ItemDetails extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      cartItem: {
        flatlock,
        flatlockCode,
        zipperColor,
        bindingColor,
        bibBraceColor,
        managerName,
        salesRepName
      }
    } = this.props
    return (
      <>
        <DesignInfoContainer>
          <DesignInfoBox>
            <DesignInfoTitle>
              {' '}
              {formatMessage(messages.flatlock)}
            </DesignInfoTitle>
            <DesignInfoSubtitle>{flatlock || '-'} </DesignInfoSubtitle>
          </DesignInfoBox>
          <DesignInfoBox>
            <DesignInfoTitle>
              {formatMessage(messages.flatlockCode)}
            </DesignInfoTitle>
            <DesignInfoSubtitle>{flatlockCode || '-'}</DesignInfoSubtitle>
          </DesignInfoBox>
          <DesignInfoBox>
            <DesignInfoTitle>
              {formatMessage(messages.zipperColor)}
            </DesignInfoTitle>
            <DesignInfoSubtitle>{zipperColor || '-'}</DesignInfoSubtitle>
          </DesignInfoBox>
          <DesignInfoBox>
            <DesignInfoTitle>
              {formatMessage(messages.bindingColor)}
            </DesignInfoTitle>
            <DesignInfoSubtitle>{bindingColor || '-'}</DesignInfoSubtitle>
          </DesignInfoBox>
          <DesignInfoBox>
            <DesignInfoTitle>
              {formatMessage(messages.bibbraceColor)}
            </DesignInfoTitle>
            <DesignInfoSubtitle>{bibBraceColor || '-'}</DesignInfoSubtitle>
          </DesignInfoBox>
        </DesignInfoContainer>
        <NamesContainer>
          {salesRepName && (
            <DesignInfoBox>
              <DesignInfoTitle>
                {formatMessage(messages.salesRep)}
              </DesignInfoTitle>
              <DesignInfoSubtitle>{salesRepName}</DesignInfoSubtitle>
            </DesignInfoBox>
          )}
          {managerName && (
            <DesignInfoBox>
              <DesignInfoTitle>
                {formatMessage(messages.manager)}
              </DesignInfoTitle>
              <DesignInfoSubtitle>{managerName}</DesignInfoSubtitle>
            </DesignInfoBox>
          )}
        </NamesContainer>
      </>
    )
  }
}

export default ItemDetails
