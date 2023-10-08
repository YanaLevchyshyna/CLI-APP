import { program } from 'commander';
import * as contactsService from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const contactsAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactList = await contactsService.getAllContacts();
      return console.log(contactList);

    case 'get':
      const oneContact = await contactsService.getContactById(id);
      return console.log(oneContact);

    case 'add':
      const newContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);

    case 'update':
      const updatedContact = await contactsService.updateContactById(id, {
        name,
        phone,
        email,
      });
      return console.log(updatedContact);

    case 'remove':
      const deletedContact = await contactsService.deleteContactById(id);
      return console.log(deletedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

contactsAction(argv);

// contactsAction({ action: 'list' });
// contactsAction({ action: 'get', id: 'drsAJ4SHPYqZeG-83QTVW' });

// contactsAction({
//   action: 'add',
//   name: 'Anny Bridge',
//   phone: '(098) 120-0056',
//   email: 'anny_br@egmail.com',
// });

// contactsAction({
//   action: 'update',
//   id: 'j1tEVEMQ6M1mnJCIe1B8k',
//   name: 'Ron Vizly',
//   phone: '(050) 893-2314',
//   email: 'r_vizly@gmail.com',
// });

// contactsAction({ action: 'remove', id: '5SdIWESVKojW_LFutVaj5' });
