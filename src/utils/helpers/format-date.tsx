import { formatDistanceToNow } from "date-fns";

export function formatDate(date: Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}