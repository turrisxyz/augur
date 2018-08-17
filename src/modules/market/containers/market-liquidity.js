import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import getValue from 'utils/get-value'
import { removeLiquidityOrder, startOrderSending, clearMarketLiquidityOrders } from 'modules/create-market/actions/liquidity-management'
import { updateModal } from 'modules/modal/actions/update-modal'
import { MODAL_CONFIRM } from 'modules/modal/constants/modal-types'

import MarketLiquidity from 'modules/market/components/market-liquidity/market-liquidity'

const mapStateToProps = (state, ownProps) => ({
  isLogged: state.isLogged,
  isMobile: state.isMobile,
  isMobileSmall: state.isMobileSmall,
  availableEth: getValue(state, 'loginAccount.eth') || '0',
  loginAccount: state.loginAccount,
})

const mapDispatchToProps = dispatch => ({
  clearMarketLiquidityOrders: data => dispatch(clearMarketLiquidityOrders(data)),
  removeLiquidityOrder: data => dispatch(removeLiquidityOrder(data)),
  submitLiquidityOrders: data => dispatch(startOrderSending(data)),
  updateModal: data => dispatch(updateModal({ type: MODAL_CONFIRM, ...data })),
})

const MarketLiquidityContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MarketLiquidity))

export default MarketLiquidityContainer
