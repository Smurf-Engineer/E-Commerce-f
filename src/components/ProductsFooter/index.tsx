/**
 * SportsFooter Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'
import messages from './messages'
import Span from '../Common/UnderlinedLink'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
}
const sports = {
  'home': [
    { name: 'NOVA PRO Custom Race Jersey', path: '/product?id=164&modelId=nova_pro&ps=us' },
    { name: 'FONDO Custom Club Jersey', path: '/product?id=7&modelId=fondo&ps=account' },
    { name: 'FORTE Custom Classic Jersey', path: '/product?id=265&modelId=forte&ps=product' },
    { name: 'ECHELON LS Custom Race Suit', path: '/product?id=94&modelId=echelon_ls&ps=product' },
    { name: 'WHISTLER Custom Short Sleeve Tri Suit', path: '/product?id=95&modelId=whistler&ps=product' },
    { name: 'PULSE Custom Tri Top', path: '/product?id=95&modelId=whistler&ps=product' },
    { name: 'SOLAR PRO Custom Bib Short', path: '/product?id=10&modelId=solar_pro_bib&ps=product' },
    { name: 'CADENCE PRO Custom Bib Short', path: '/product?id=185&modelId=cadence_pro&ps=product' },
    { name: 'CENTURY Custom Cycling Cap', path: '/product?id=3&modelId=century&ps=product' }
  ],
  'mountain-bike': [
    { name: 'FLOW 3/4 Custom MTB Jersey', path: '/product?id=158&modelId=flow&ps=product' },
    { name: 'FLOW SS Custom Trail Jersey', path: '/product?id=157&modelId=flow_ss&ps=product' },
    { name: 'FLOW LS Custom  Jersey', path: '/product?id=159&modelId=flow_ls&ps=product' },
    { name: 'ULTRA Custom Aero Jersey', path: '/product?id=63&modelId=ultra&ps=product' },
    { name: 'FLUX Custom MTB Short', path: '/product?id=161&modelId=flux&ps=product' },
    { name: 'FACTION Custom Pant', path: '/product?id=309&modelId=faction&ps=product' },
    { name: 'SOLAR PRO Custom Bib Short', path: '/product?id=10&modelId=solar_pro_bib&ps=product' },
    { name: 'VENTURA Custom Cargo Bib Short', path: '/product?id=264&modelId=ventura_bib&ps=product' },
    { name: 'ECHELON SS Custom Race Suit', path: '/product?id=61&modelId=echelon_ss&ps=product' }
  ],
  'road-bike': [
    { name: 'FONDO Custom Club Jersey', path: '/product?id=7&modelId=fondo&ps=product' },
    { name: 'NOVA PRO Custom Race Jersey', path: '/product?id=164&modelId=nova_pro&ps=product' },
    { name: 'FORZA Custom Classic Jersey', path: '/product?id=262&modelId=forza&ps=product' },
    { name: 'ULTRA Custom Aero Jersey', path: '/product?id=63&modelId=ultra&ps=product' },
    { name: 'FORTE LS Custom Jersey', path: '/product?id=265&modelId=forte&ps=product' },
    { name: 'SOLAR PRO Custom Bib Short', path: '/product?id=10&modelId=solar_pro_bib&ps=product' },
    { name: 'CADENCE PRO Custom Bib Short', path: '/product?id=183&modelId=cadence_pro_bib&ps=product' },
    { name: 'ECHELON SS Custom Race Suit', path: '/product?id=61&modelId=echelon_ss&ps=product' },
    { name: 'CENTURY Custom Cycling Cap', path: '/product?id=3&modelId=century&ps=product' }
  ],
  'triathlon': [
    { name: 'WHISTLER Custom Short Sleeve Tri Suit', path: '/product?id=95&modelId=whistler&ps=account' },
    { name: 'TAILWIND Custom Tri Suit', path: '/product?id=333&modelId=tailwind&ps=product' },
    { name: 'PULSE Custom Tri Top', path: '/product?id=330&modelId=pulse&ps=product' },
    { name: 'ARGON Short Sleeve Custom Tri Jersey', path: '/product?id=260&modelId=argon&ps=product' },
    { name: 'LEEDS Custom Short Sleeve Tri Suit Suit', path: '/product?id=96&modelId=leeds&ps=product' },
    { name: 'NITRON Men’s Custom ITU Suit', path: '/product?id=240&modelId=nitron&ps=product' },
    { name: 'XENON Women’s Custom ITU Suit', path: '/product?id=241&modelId=xenon&ps=product' },
    { name: 'BORON Custom Tri Short', path: '/product?id=244&modelId=boron&ps=product' },
    { name: 'COMP PRO Custom Tri Short', path: '/product?id=1&modelId=comp_pro&ps=product' }
  ],
  'active': [
    { name: 'STRIDE SS Custom Crew', path: '/product?id=326&modelId=stride_crew_ss&ps=product' },
    { name: 'STRIDE SS Custom V-Neck', path: '/product?id=328&modelId=stride_vneck_ss&ps=product' },
    { name: 'STRIDE LS Custom Crew', path: '/product?id=327&modelId=stride_crew_ls&ps=product' },
    { name: 'STRIDE LS Custom V-Neck', path: '/product?id=328&modelId=stride_vneck_ss&ps=product' },
    { name: 'APEX Men’s Custom Singlet', path: '/product?id=64&modelId=apex&ps=product' },
    { name: 'ARC Women’s Custom Singlet', path: '/product?id=82&modelId=arc&ps=product' },
    { name: 'REPLAY Custom Polo', path: '/product?id=99&modelId=replay&ps=product' },
    { name: 'TANGO Custom Zip Polo', path: '/product?id=127&modelId=tango&ps=product' }
  ],
  'nordic': [
    { name: 'HEIMDALL PRO Custom Nordic Suit', path: '/product?id=170&modelId=heimdall_pro&ps=product' },
    { name: 'RUKA Custom Nordic Suit', path: '/product?id=204&modelId=ruka&ps=product' },
    { name: 'ARENDAL Custom Warm-up Jacket', path: '/product?id=166&modelId=arendal&ps=product' },
    { name: 'BERGEN Custom Warmup Pant', path: '/product?id=167&modelId=bergen&ps=product' },
    { name: 'ALASKA Custom Softshell Jacket', path: '/product?id=250&modelId=alaska&ps=product' },
    { name: 'DENALI Custom Nordic Hat', path: '/product?id=237&modelId=denali&ps=product' },
    { name: 'BUDAL Custom Nordic Headband', path: '/product?id=168&modelId=budal&ps=product' },
    { name: 'ELEMENT Semi-Custom Quilted Jacket', path: '/product?id=322&modelId=element&ps=product' },
    { name: 'JUNEAU Custom Nordic Vest', path: '/product?id=197&modelId=juneau&ps=product' }
  ],
}

const titles = {
  'home': 'ALL PRODUCTS',
  'mountain-bike': 'MOUNTAIN BIKE',
  'road-bike': 'ROAD BIKE',
  'triathlon': 'TRIATHLON',
  'active': 'ACTIVE',
  'nordic': 'NORDIC SKI'
}

const ProductsFooter = ({ formatMessage }: Props) => {
  const openUrl = (evt: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { id }
    } = evt
    if (id) {
      window.location.replace(id)
    }
  }
  const pathName = typeof window !== 'undefined' ? window.location.pathname : '/home'
  const subRoute = pathName && pathName.length > 0 ? pathName.split('/')[1] : 'home'
  const actualKey = titles[subRoute] ? subRoute : 'home'
  const actualTitle = titles[actualKey] || 'home'
  return (
    <Container>
      <Title>{actualTitle} {formatMessage(messages.title)}</Title>
      {sports[actualKey] && sports[actualKey].length > 0 ?
        sports[actualKey].map(({ name: linkName, path }, key: number) =>
        <Text {...{ key }} onClick={openUrl} id={path}>
          <Span id={path} noClick={true} link={path}>{linkName}</Span>
        </Text>
      ) : 
        sports.home.map(({ name: linkName, path }, key: number) =>
        <Text {...{ key }} onClick={openUrl} id={path}>
          <Span id={path} noClick={true} link={path}>{linkName}</Span>
        </Text>
      )}
    </Container>
  )
}

export default ProductsFooter
