import { log } from "@graphprotocol/graph-ts";
import { Option } from "../../generated/schema";
import {
  LogOptionCreation,
  LogSettle,
  LogCancel,
} from "../../generated/Option/Option";
import {
  extractBigInt,
  extractAddressFromBytes32,
  extractBoolean,
} from "../utils/helpers";

export function handleLogCreateOption(event: LogOptionCreation): void {}

export function handleLogSettle(event: LogSettle): void {}

export function handleLogCancel(event: LogCancel): void {}
