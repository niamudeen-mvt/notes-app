import { CiImageOn } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { FaFileLines } from 'react-icons/fa6';

export default function FileUploader({ setFiles, files }) {
   const handleOnChange = (event) => {
      setFiles(event.target.files);
   };

   const handleRemoveFiles = () => {
      setFiles([]);
   };
   return (
      <>
         <div className="space-y-4">
            <div className="border-2 border-dotted rounded-md p-14">
               <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-2 rounded-md">
                     <CiImageOn />
                  </div>
                  <div>
                     <label
                        htmlFor="file-uploader"
                        className="text-xs cursor-pointer"
                     >
                        <p className="text-xs">Upload a Picture</p>
                        <p className="text-[9px] text-gray-400">
                           JPG, PNG or JPEG (size. 200KB)
                        </p>
                     </label>
                     <input
                        id="file-uploader"
                        type="file"
                        multiple
                        hidden
                        onChange={handleOnChange}
                     />
                  </div>
               </div>
            </div>
            {files?.length > 0 && (
               <div className="bg-gray-100 rounded-md p-2 px-5 flex_between">
                  <FaFileLines />
                  <p className="text-xs">{files?.length} File Selected</p>
                  <IoCloseOutline
                     size={18}
                     className="cursor-pointer"
                     onClick={handleRemoveFiles}
                  />
               </div>
            )}
         </div>
      </>
   );
}
