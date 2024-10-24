export default function InfoDialog({
   showInfoDialog,
   setShowInfoDialog,
   handleAccept,
   handleCancel,
}) {
   return (
      <>
         {showInfoDialog && (
            <div className="fixed bg-backdrop inset-0 w-full h-full z-50 flex_center">
               <div id="popup-modal" tabindex="-1">
                  <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow">
                     {/* close button */}
                     <button
                        type="button"
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        onClick={() => setShowInfoDialog(false)}
                     >
                        <svg
                           className="w-3 h-3"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 14 14"
                        >
                           <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                           />
                        </svg>
                        <span className="sr-only">Close modal</span>
                     </button>

                     <div className="p-4 md:p-5 text-center">
                        <svg
                           className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 20 20"
                        >
                           <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                           />
                        </svg>
                        <h3 className="mb-5 font-normal text-gray-500 text-sm">
                           Are you sure you want to delete this note?
                        </h3>

                        {/* action buttons */}
                        <div className="flex gap-4">
                           <button
                              onClick={handleAccept}
                              type="button"
                              className="btn"
                           >
                              Yes, I'm sure
                           </button>
                           <button
                              onClick={handleCancel}
                              type="button"
                              className="btn !bg-gray-200 !text-black"
                           >
                              No, cancel
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
