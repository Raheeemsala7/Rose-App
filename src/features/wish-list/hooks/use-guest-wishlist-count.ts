'use client';

import { useSyncExternalStore } from 'react';
import { getGuestWishlist, GUEST_WISHLIST_CHANGE_EVENT} from '../storage/guest-wishlist'; 

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(GUEST_WISHLIST_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(GUEST_WISHLIST_CHANGE_EVENT, callback);
  }
}

function getSnapshot() {
  return getGuestWishlist().length;
}

function getServerSnapshot() {
  return 0;
}

export function useGuestWishlistCount() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}