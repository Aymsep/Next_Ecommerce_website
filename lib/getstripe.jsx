import {loadStripe} from '@stripe/stripe-js'

let stripepromise;

const  getstripe = () =>{
    if(!stripepromise){
        stripepromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }
    return stripepromise;
}

export  default getstripe;