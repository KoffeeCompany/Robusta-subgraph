import { Bytes, BigInt, log } from "@graphprotocol/graph-ts";

export function extractData(data: string, offset: i32, length: i32): string {
  let start = offset * 2;
  let end = start + length * 2;
  if (data.length < end) {
    log.warning("Index out of range. end {}, length {}", [
      intToString(end),
      intToString(data.length),
    ]);
  }
  return data.slice(start, end);
}

export function intToString(value: i32): string {
  return BigInt.fromI32(value).toString();
}

export function extractBigInt(data: string, offset: i32, length: i32): BigInt {
  return BigInt.fromUnsignedBytes(
    Bytes.fromHexString(extractData(data, offset, length)).reverse() as Bytes
  );
}

export function extractAddressFromBytes32(data: string, offset: i32): string {
  return "0x" + extractData(data, offset + 12, 20);
}

export function extractBoolean(data: string, offset: i32, length: i32): boolean {
  return (new Boolean(extractData(data, offset + 31, 1))).valueOf();
}