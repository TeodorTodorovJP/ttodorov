export default {
  users: {
    uniqueUserName: 'Expected username: string between 4 and 50 characters.',
    password: 'Expected password: between 7 to 15 characters which contain at least one numeric digit and a special character',
    email: 'Invalid email.',
    userAlreadyExists: 'A person with such username already exists.',
    invalidCredentials: 'Invalid username or password',
    invalidUserId: 'The user you want to find does not exist.',
    notListedRole: 'The role you have chosen is not valid.'
  },
  signin: {
    uniqueUserName: 'Expected title: string between 3 and 255 characters.',
    password: 'Expected password: between 7 to 15 characters which contain at least one numeric digit and a special character'
  },
  admins: {
    id: 'Expected id: number greater than 0.',
    days: 'Expected days: number greater than -1.'
  },
  expectedBody: {
    admins: {
      ban: {
        "id": "1", 
        "days": "1"
      }
    }
  }
};
