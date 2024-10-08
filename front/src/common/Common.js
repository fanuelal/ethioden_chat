import { format, isToday, isYesterday } from 'date-fns';

export const formatMessageDate = (date) => {
   
      return format(date, 'h:mm a');
    
  };
  export const formatDates = (date) => {
    if (isToday(date)) {
      return 'today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };