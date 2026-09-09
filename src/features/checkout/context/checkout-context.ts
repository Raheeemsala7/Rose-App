// Re-exports useCheckoutStore as useCheckout for backward compatibility.
// Components that previously used useCheckout() from Context now read from Zustand.
export { useCheckoutStore as useCheckout } from '../store/checkout.store';
