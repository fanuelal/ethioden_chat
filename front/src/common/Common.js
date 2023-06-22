import { format, isToday, isYesterday } from 'date-fns';

export const formatMessageDate = (date) => {
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };
 