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
