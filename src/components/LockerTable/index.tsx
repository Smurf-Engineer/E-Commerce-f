/**
 * LockerTable Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import { DropPricingModal } from '../DropPricingModal'
import messsages from './messages'
import {
  Table,
  HeaderRow,
  Cell,
  Title,
  Question,
  ModalTitle,
  buttonStyle,
  InfoBody, PopoverStyled, PopoverText, InfoIcon
} from './styledComponents'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
import filter from 'lodash/filter'
import Modal from 'antd/lib/modal'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { PriceRange, LockerTableType } from '../../types/common'
import Product from './ProductRow'
import config from '../../config/index'

const { info } = Modal

interface Header {
  message: string
  width?: number
  withHelp?: boolean
  tabletWidth?: number
  helpMessage?: string
}

const PERSONAL = 'Personal'

const teamTitles: Header[] = [
  { message: '', width: 5, tabletWidth: 5 },
  { message: '', width: 20, tabletWidth: 20 },
  { message: '', width: 10, tabletWidth: 10 },
  { message: '', width: 10, tabletWidth: 10 },
  { message: 'regularPrice', width: 10, tabletWidth: 10 },
  { message: 'fixedPrice', width: 10, tabletWidth: 10, withHelp: true },
  { message: 'quantity', width: 10, tabletWidth: 10 },
  { message: 'visible', width: 10, tabletWidth: 10 },
  { message: '', width: 15, tabletWidth: 10 }
]

const resellerTitles: Header[] = [
  { message: '', width: 5, tabletWidth: 5 },
  { message: '', width: 20, tabletWidth: 20 },
  { message: '', width: 10, tabletWidth: 10 },
  { message: '', width: 10, tabletWidth: 10 },
  { message: 'currency', width: 10, tabletWidth: 10, withHelp: true, helpMessage: 'currencyDesc' },
  { message: 'teamPrice', width: 10, tabletWidth: 10, withHelp: true, helpMessage: 'msrpDesc' },
  { message: 'purchasePrice', width: 10, tabletWidth: 10, withHelp: true, helpMessage: 'dealerPrice' },
  { message: 'yourPrice', width: 10, tabletWidth: 10, withHelp: true, helpMessage: 'listPriceDesc' },
  { message: 'profit', width: 10, tabletWidth: 10 },
  { message: 'yourMargin', width: 10, tabletWidth: 10 },
  { message: 'visible', width: 10, tabletWidth: 10 },
  { message: '', width: 15, tabletWidth: 10 }
]

interface Props {
  formatMessage: (messageDescriptor: any) => string
  items: LockerTableType[]
  teamSizeRange: string
  currentCurrency?: string
  hideQuickView?: boolean
  isFixed?: boolean
  onDemand?: boolean
  isReseller?: boolean
  resellerComission?: number
  onPressDelete: (index: number) => void
  onPressQuickView?: (
    id: number,
    yotpoId: string,
    hideSliderButtons?: boolean
  ) => void
  handleOnSetPrice: (value: number, currency: number, itemIndex: number) => void
  onPressVisible: (index: number, checked: boolean) => void
  onMoveRow: (index: number, hoverIndex: number, row: any) => void
}

class LockerTable extends React.PureComponent<Props, {}> {
  state = { pricingModalOpen: false }
  getTierPrice = (prices: PriceRange[], range = '2-5'): number => {
    const index = findIndex(prices, ({ quantity }) => quantity === range)
    return index < 0 ? prices[prices.length - 1].price : prices[index].price
  }

  onTogglePriceModal = () => {
    this.setState({ pricingModalOpen: !this.state.pricingModalOpen } as any)
  }

  moveRow = (dragIndex: number, hoverIndex: number) => {
    const { items, onMoveRow } = this.props
    const dragRow = items[dragIndex]
    onMoveRow(dragIndex, hoverIndex, dragRow)
  }

  openInfo = () => {
    const { formatMessage } = this.props
    info({
      title: <ModalTitle>{formatMessage(messsages.aboutTeam)}</ModalTitle>,
      icon: ' ',
      okText: formatMessage(messsages.gotIt),
      okButtonProps: {
        style: buttonStyle
      },
      content: <InfoBody>{formatMessage(messsages.aboutTeamInfo)}</InfoBody>
    })
  }

  render() {
    const {
      formatMessage,
      items,
      isFixed,
      hideQuickView,
      onPressDelete,
      onPressQuickView,
      onPressVisible,
      handleOnSetPrice,
      isReseller,
      resellerComission,
      teamSizeRange,
      currentCurrency = config.defaultCurrency,
      onDemand = true
    } = this.props
    const headerTitles = isReseller ? resellerTitles : teamTitles
    const itemsSelected = items.map(
      (
        { design, visible, totalOrders, priceRange, resellerRange = [] }: LockerTableType,
        index
      ) => {
        const name = get(design, 'name')
        const product = get(design, 'product')
        const productPrices = get(product, 'priceRange')
        const pricesArray = filter(productPrices, {
          abbreviation: currentCurrency || config.defaultCurrency
        })
        const startingPrice = this.getTierPrice(pricesArray)
        const targetPrice = this.getTierPrice(pricesArray, teamSizeRange)
        const image = get(design, 'image')
        const description =
          get(product, 'shortDescription', false) || get(product, 'description')
        const productId = get(product, 'id')
        const yotpoId = get(product, 'yotpoId')
        const type = get(product, 'type')
        const regularPrice = get(
          find(pricesArray, {
            quantity: PERSONAL
          }),
          'price',
          0
        )
        const fixedPrice =
          priceRange && priceRange.length
            ? get(find(priceRange, ['abbreviation', currentCurrency]), 'price')
            : startingPrice

        const resellerPrice = get(find((resellerRange), ['abbreviation', currentCurrency]), 'price')
        const currencyIndex = findIndex((resellerRange), ['abbreviation', currentCurrency])
        let currentRangePrice = 0

        pricesArray.some((current: PriceRange, rangeIndex: number) => {
          const quantities = current.quantity.split('-')
          const maxQuantity = parseInt(quantities[1], 10)

          if (totalOrders === 0 && current.quantity === PERSONAL) {
            currentRangePrice = fixedPrice
            return true
          }
          if (totalOrders <= maxQuantity) {
            currentRangePrice = current.price
            return true
          }
        })

        const currentPrice = onDemand ? fixedPrice : currentRangePrice

        return (
          <Product
            {...{
              index,
              image,
              name,
              description,
              hideQuickView,
              productId,
              currentCurrency,
              fixedPrice,
              currencyIndex,
              isReseller,
              resellerComission,
              resellerPrice,
              regularPrice,
              targetPrice,
              onPressDelete,
              onPressQuickView,
              handleOnSetPrice,
              onPressVisible,
              yotpoId,
              totalOrders,
              formatMessage,
              onDemand
            }}
            key={index}
            description={`${type} ${description}`}
            currentOrders={totalOrders}
            fixedPrice={currentPrice}
            visible={visible}
            moveRow={this.moveRow}
          />
        )
      }
    )

    const renderTable = items.length > 0 && itemsSelected
    return (
      <Table>
        <HeaderRow>
          {headerTitles.map(
            ({ width, tabletWidth, message, withHelp, helpMessage }, key) => (
              <Cell {...{ key, width, tabletWidth }}>
                <Title>
                  {message ? formatMessage(messsages[message]) : ''}
                </Title>
                {isReseller && withHelp && !!helpMessage &&
                  <PopoverStyled
                    trigger="click"
                    content={
                      <PopoverText
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(messsages[helpMessage])
                        }}
                      />
                    }
                  >
                    <InfoIcon type="info-circle" />
                  </PopoverStyled>
                }
                {withHelp && isFixed && (
                  <Question
                    onClick={this.onTogglePriceModal}
                    type="question-circle"
                  />
                )}
              </Cell>
            )
          )}
        </HeaderRow>
        {renderTable}
        <DropPricingModal
          toggleModal={this.onTogglePriceModal}
          {...{ formatMessage, pricingModalOpen: this.state.pricingModalOpen }}
        />
      </Table>
    )
  }
}

export default DragDropContext(HTML5Backend)(LockerTable)
