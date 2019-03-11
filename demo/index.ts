import { SalteAuth, Generic } from '@salte-auth/salte-auth';
import { Popup } from '../src/popup';

const auth = new SalteAuth({
  providers: [
    new Generic.OAuth2({
      login: function(): string {
        return 'https://github.com/login/oauth/authorize';
      },

      clientID: 'b44780ca7678681180c9',
      responseType: 'code',

      routes: true
    })
  ],

  handlers: [
    new Popup({
      default: true
    })
  ]
});

auth.on('login', (error, idToken) => {
  if (error) console.error(error);
  else console.log(idToken);
});

const button = document.createElement('button');
button.innerHTML = `Login`;
button.addEventListener('click', () => {
  auth.login('generic.oauth2');
});

document.body.appendChild(button);
