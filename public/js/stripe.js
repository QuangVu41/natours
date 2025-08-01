import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51PnYUKA8TezL07QRQOfjBGQSpeBRX6vUItxlUmKrQYiaO3hoXmrhTYCtm5zqYeEl0kZsPx8QxuW6ltaC64nSWLRg00egWoSmtS',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err.message);
  }
};
