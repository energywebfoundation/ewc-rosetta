export const stripZXPrefix = (value: string) =>
  value.startsWith("0x") ? value.substring(2) : value;

export const addZXPrefix = (value: string) =>
  value.startsWith("0x") ? value : `$0x{value}`;
