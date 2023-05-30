
import {currentUser} from './currentUserData'
export const notifications = [
    {
      id: 1,
      userImage: currentUser.profileImg,
      content: 'new message',
      sender: currentUser.username,
    },
    {
      id: 2,
      userImage: currentUser.profileImg,
      content: 'hi there',
      sender: currentUser.username,
    },
    {
        id: 2,
        userImage: currentUser.profileImg,
        content: 'new message.',
        sender: 'john',
      },
      {
        id: 1,
        userImage: currentUser.profileImg,
        content: 'new message',
        sender: currentUser.username,
      },
      {
        id: 2,
        userImage: currentUser.profileImg,
        content: 'hello',
        sender: currentUser.username,
      },
      {
          id: 2,
          userImage: currentUser.profileImg,
          content: 'new message.',
          sender: 'john',
        },
     
  ];