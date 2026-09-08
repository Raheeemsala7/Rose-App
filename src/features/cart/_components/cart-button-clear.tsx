// 'use client';

// import { useTranslations } from "next-intl";
// import { useCart } from "../hooks/cart.hooks";


// export default function CartButtonClear() {
//   // Translations
//   const t = useTranslations('cart-list');

//   // Cart Context
//   const {  } = useCart();

//   const [showModelDelete, setShowModelDelete] = useState<boolean>(false);

//   // Show Model Delete Function
//   function deleteModel() {
//     if(!isEmpty){
//       setShowModelDelete(true);
//     }
//   }

//   return (
//     <>
//       <Button
//         onClick={deleteModel}
//         variant={'secondary'}
//         disabled={isEmpty}
//         className="w-41.25 flex items-center gap-1.5 cursor-pointer"
//       >
//         <BrushCleaning className="size-5" /> {t('cart-clear')}
//       </Button>

// {/* Model Delete */}
//       {showModelDelete && <CartModelDelete setShowModelDelete={setShowModelDelete} />}
//     </>
//   );
// }
