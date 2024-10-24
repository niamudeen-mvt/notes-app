import { getDataFromLc } from '../utils/helper';

export default function ImagePreview({
   showImagePreview,
   setShowImagePreview,
}) {
   const activeNoteImage = getDataFromLc('active_note_image');
   return (
      <>
         {showImagePreview && (
            <div className="fixed bg-backdrop inset-0 w-full h-full z-50 flex_center">
               <div class="relative p-4 max-w-2xl w-full max-h-[500px] overflow-hidden">
                  <div class="relative bg-white rounded-lg shadow p-8 space-y-4">
                     <div class="flex items-center justify-between">
                        <button
                           type="button"
                           class="text-black bg-transparent hover:bg-gray-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                           onClick={() => setShowImagePreview(false)}
                        >
                           <svg
                              class="w-3 h-3"
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
                           <span class="sr-only">Close modal</span>
                        </button>
                     </div>
                     <div class="flex_center">
                        <div className="overflow-hidden">
                           <img
                              src={activeNoteImage}
                              alt=""
                              className="object-contain"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
