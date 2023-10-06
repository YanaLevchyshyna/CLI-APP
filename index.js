import * as contactsService from './contacts.js';

const contactsAction = async ({ action, id }) => {
  switch (action) {
    case 'list':
      const contactList = await contactsService.getAllContacts();
      return console.log(contactList);

    default:
      console.log('Unknown action');
      break;
  }
};

contactsAction({ action: 'list' });
