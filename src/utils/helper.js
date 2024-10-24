// These functions are for local storage

export const setDataIntoLc = (key, value, isJson = false) => {
   if (isJson) {
      return localStorage.setItem(key, JSON.stringify(value));
   }
   localStorage.setItem(key, value);
};

export const getDataFromLc = (key, isJson = false) => {
   if (isJson) {
      return JSON.parse(localStorage.getItem(key));
   }
   return localStorage.getItem(key);
};

export const removeDataFromLc = (key) => {
   localStorage.removeItem(key);
};
export const checkIfobjEmpty = (obj) => {
   let noErrors = '';
   Object.keys(obj).forEach((e) => {
      if (obj[e] === '') {
         return (noErrors = true);
      } else return (noErrors = false);
   });

   return noErrors;
};

export const errorListtoObj = (errorsList) => {
   const arr = errorsList?.map((obj) => {
      return {
         [obj.path]: obj.msg,
      };
   });

   if (arr?.length) {
      const uniqueObjects = [];
      const keys = new Set();

      arr?.forEach((obj) => {
         const key = Object.keys(obj)[0];
         if (!keys.has(key)) {
            keys.add(key);
            uniqueObjects.push(obj);
         }
      });

      const combinedObject = uniqueObjects.reduce(
         (result, obj) => ({ ...result, ...obj }),
         {},
      );

      return combinedObject;
   }
};

// DATE AND TIME

// export const formattedDate = (dateTime) => {
//    const dateFormatter = new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//    });
//    return dateFormatter.format(dateTime);
// };

// export const formattedTime = (dateTime) => {
//    const filterdDay = daysOfWeek
//       .map((day) => {
//          if (day.value === dateTime.toString().substring(0, 3)) {
//             return day.label;
//          }
//       })
//       .filter((label) => label !== undefined);

//    const timeFormatter = new Intl.DateTimeFormat('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//    });

//    return timeFormatter.format(dateTime) + ',' + filterdDay;
// };
