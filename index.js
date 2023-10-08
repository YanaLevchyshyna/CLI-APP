import * as contactsService from './contacts.js';

const contactsAction = async ({ action, id, name, phone, email }) => {
  switch (action) {
    case 'list':
      const contactList = await contactsService.getAllContacts();
      return console.log(contactList);
    case 'getById':
      const oneContact = await contactsService.getContactById(id);
      return console.log(oneContact);
    case 'addContact':
      const newContact = await contactsService.addContact({
        name,
        phone,
        email,
      });
      return console.log(newContact);
    default:
      console.log('Unknown action');
      break;
  }
};

// contactsAction({ action: 'list' });
// contactsAction({ action: 'getById', id: 'drsAJ4SHPYqZeG-83QTVW' });
// contactsAction({ action: 'getById', id: 'qdggE76Jtbfd9eWJHrssH' });
contactsAction({
  action: 'addContact',
  name: 'Anny Bridge',
  email: 'anny_br@egmail.com',
  phone: '(098) 120-0056',
});
contactsAction({
  action: 'addContact',
  name: 'Jacky Simpson',
  email: 'j_simpson@egmail.com',
  phone: '(066) 121-4412',
});
