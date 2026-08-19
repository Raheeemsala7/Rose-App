import { GUEST_WISHLIST_KEY } from '../constants/wishlist';
import { GuestWishlistItem } from '../types/wishlist';
export const GUEST_WISHLIST_CHANGE_EVENT = 'guest-wishlist-change'; 

function notifyChange() {
  window.dispatchEvent(new Event(GUEST_WISHLIST_CHANGE_EVENT));
}


// Get guest wishlist from localStorage
export function getGuestWishlist(): GuestWishlistItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const wishlist = localStorage.getItem(GUEST_WISHLIST_KEY);

  if (!wishlist) {
    return [];
  }

  try {
    return JSON.parse(wishlist);
  } catch {
    localStorage.removeItem(GUEST_WISHLIST_KEY);
    return [];
  }
}

// Save guest wishlist to localStorage
export function setGuestWishlist(wishlist: GuestWishlistItem[]) {
  localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
  notifyChange();
}

// Add item to guest wishlist
export function addGuestWishlistItem(item: GuestWishlistItem) {
  const wishlist = getGuestWishlist();

  const exists = wishlist.some((wishlistItem) => wishlistItem.productId === item.productId);

  if (exists) {
    return;
  }

  wishlist.push(item);

  setGuestWishlist(wishlist);
}

// Remove item from guest wishlist
export function removeGuestWishlistItem(productId: string) {
  const wishlist = getGuestWishlist();

  const updatedWishlist = wishlist.filter((item) => item.productId !== productId);

  setGuestWishlist(updatedWishlist);
}

// Toggle guest wishlist item
export function toggleGuestWishlistItem(productId: string) {
  const wishlist = getGuestWishlist();

  const exists = wishlist.some((item) => item.productId === productId);

  if (exists) {
    removeGuestWishlistItem(productId);
    return false;
  }

  addGuestWishlistItem({ productId });
  return true;
}

// Clear guest wishlist
export function clearGuestWishlist() {
  localStorage.removeItem(GUEST_WISHLIST_KEY);
  notifyChange(); 
}
