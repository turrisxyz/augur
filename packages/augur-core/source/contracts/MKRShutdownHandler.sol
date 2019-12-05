pragma solidity 0.5.10;

import 'ROOT/ICash.sol';
import 'ROOT/external/IDaiVat.sol';
import 'ROOT/libraries/math/SafeMathUint256.sol';


contract MKRShutdownHandler {
    using SafeMathUint256 for uint256;

    ICash public cash;
    IDaiVat public vat;

    uint constant DAI_ONE = 10 ** 27;

    function initializeMKRShutdownHandler(address _vat, address _cash) internal {
        vat = IDaiVat(_vat);
        cash = ICash(_cash);
    }

    function cashTransfer(address _to, uint256 _amount) internal {
        address _from = address(this);
        if (vat.live() == 0) {
            _amount = shutdownTransfer(_from, _to, _amount);
            if (_amount == 0) {
                return;
            }
        }
        require(cash.transfer(_to, _amount));
    }

    function cashTransferFrom(address _from, address _to, uint256 _amount) internal {
        if (vat.live() == 0) {
            _amount = shutdownTransfer(_from, _to, _amount);
            if (_amount == 0) {
                return;
            }
        }
        require(cash.transferFrom(_from, _to, _amount));
    }

    function shutdownTransfer(address _from, address _to, uint256 _amount) internal returns (uint256) {
        uint256 _cashBalance = cash.balanceOf(_from);
        if (_cashBalance < _amount) {
            uint256 _vDaiToTransfer = vat.dai(_from).min(_amount.mul(DAI_ONE));
            vat.move(_from, _to, _vDaiToTransfer);
            _amount -= _vDaiToTransfer.div(DAI_ONE);
        }
        return _amount;
    }
}