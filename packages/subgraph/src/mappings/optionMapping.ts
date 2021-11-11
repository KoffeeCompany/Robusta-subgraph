import { log, Address, BigInt } from "@graphprotocol/graph-ts";
import { Option } from "../../generated/schema";
import {
  LogOptionCreation,
  LogSettle,
  LogCancel,
  LogOptionBuy,
} from "../../generated/Option/Option";
import {
  UniswapV3Pool
} from "../../generated/Option/UniswapV3Pool";
import {
  extractBigInt,
  extractAddressFromBytes32,
} from "../utils/helpers";

export function handleLogCreateOption(event: LogOptionCreation): void {
  let entity = Option.load(event.params.tokenId.toString());
  if (entity != null) {
    log.debug("Duplicate Option {}", [event.params.tokenId.toString()])
  }
  else {
    entity = new Option(event.params.tokenId.toString());
  }

  entity.submittedTxHash = event.transaction.hash;
  entity.createdAt = event.block.timestamp;
  entity.updatedAt = event.block.timestamp;
  entity.createdAtBlock = event.block.number;
  entity.updatedAtBlock = event.block.number;
  entity.updatedAtBlockHash = event.block.hash;

  entity.pool = event.params.option.pool.toHexString();
  entity.optionType = event.params.option.optionType == 0 ? "CALL" : "PUT";
  entity.strike = BigInt.fromI32(event.params.option.strike);
  entity.notional = event.params.option.notional;
  entity.maturity = event.params.option.maturity;
  entity.maker = event.params.option.maker.toHexString();
  entity.resolver = event.params.option.resolver.toHexString();
  entity.price = event.params.option.price;


  entity.status = 'submitted';

  let pool = UniswapV3Pool.bind(Address.fromString(entity.pool));

  entity.token0 = pool.token0().toHexString();
  entity.token1 = pool.token1().toHexString();
  entity.poolFee = BigInt.fromI32(pool.fee());

  entity.save();
}

export function handleLogSettle(event: LogSettle): void {
  let entity = Option.load(event.params.tokenId.toString());
  
  if (entity == null) {
    log.debug("Option don't exist {}", [event.params.tokenId.toString()]);
    return;
  }

  entity.amount0 = event.params.amount0Out;
  entity.amount1 = event.params.amount1Out;
  entity.feeAmount = event.params.feeAmount;

  entity.status = 'executed';

  entity.executedTxHash = event.transaction.hash;
  entity.updatedAt = event.block.timestamp;
  entity.updatedAtBlock = event.block.number;
  entity.updatedAtBlockHash = event.block.hash;

  entity.save();
}

export function handleBuyOption(event: LogOptionBuy): void {
  let entity = Option.load(event.params.tokenId.toString());
  
  if (entity == null) {
    log.debug("Option don't exist {}", [event.params.tokenId.toString()]);
    return;
  }

  entity.status = 'bought';

  entity.buyer = event.params.buyer.toHexString();

  entity.save();
}

export function handleLogCancel(event: LogCancel): void {
  let entity = Option.load(event.params.tokenId.toString());

  if (entity == null) {
    log.debug("Option don't exist {}", [event.params.tokenId.toString()]);
    return;
  }

  entity.cancelledTxHash = event.transaction.hash;
  entity.updatedAt = event.block.timestamp;
  entity.updatedAtBlock = event.block.number;
  entity.updatedAtBlockHash = event.block.hash;

  entity.status = 'cancelled';


  entity.save();
}