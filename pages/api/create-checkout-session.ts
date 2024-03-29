import { stripe } from '../../utils/stripe';
import { NextApiHandler } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createOrRetrieveCustomer } from '../../utils/supabase-admin';
import { getURL } from '../../utils/helpers';

const createCheckoutSession: NextApiHandler = async ( req, res) => { 
  console.log("api called")
  if (req.method === 'POST') {
    const supabaseServerClient = createServerSupabaseClient({ req, res });
    const { price, quantity = 1, metadata = {} } = req.body;
    

    try {
      const {
        data: { user }
      } = await supabaseServerClient.auth.getUser();
      

      const customer = await createOrRetrieveCustomer({
        uuid: user?.id || '',
        email: user?.email || ''
      });
      
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer,
        line_items: [
          {

            price: price.id,
            quantity:quantity,
          }
        ],
        allow_promotion_codes: true,
        // subscription_data: {
        //   trial_from_plan: true,
        //   metadata
        // },
        success_url: `${getURL()}/dashboard`,
        cancel_url: `${getURL()}/pricing`
      });
      
      return res.status(200).json({ sessionId: session.id });
    } catch (err) {
      
      console.log(err);
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default createCheckoutSession;