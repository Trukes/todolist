import apiConnect from '../services/api.connect'

export default function auth({ next, router }) {
    
    // validar o token
    if (!localStorage._token_) {
        return router.push({ name: 'LoginView' });
    }
    apiConnect.post(
        '/auth/validate',
        {},
        (response) => { // get response
            
            if(response.status === "OK"){
                return next();
            } else {
                return router.push({ name: 'LoginView' });
            }
        }
    )
    return next();
  }