export function formatToastMessages(message: string | string[]): string {
  if(Array.isArray(message)){
    return message.join("\n");
  }
  return message;
}