

/**
 * It takes a string and returns a number
 * @param {any} data - any - this is the data that will be passed to the function.
 * @returns the number value of the data passed in.
 */
const stringToNumber = (data: string, defaultValue = 0): number => {
  const result = +data;
  return isNaN(result) ? defaultValue : result;
};


/**
 * "Get the current time, subtract the timezone offset, and return the result."
 * 
 * The first line of the function is a TypeScript type annotation. It says that the function returns a
 * Date object
 * @returns A function that returns the current date and time in the local timezone.
 */
const localNow = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(now.getTime() - offsetMs);
  return dateLocal;
};

const getTableName = (type: string) => {
  let tableName;
  switch (type) {
    case 'ItemName':
      tableName = 'evaluation_detail_item';
      break;
    case 'Category':
      tableName = 'evaluation_detail_item_category';
      break;
    case 'Group':
      tableName = 'evaluation_detail_item_category_group';
      break;
    default:
      break;
  }
  return tableName;
};

export {
  stringToNumber,
  localNow,
  getTableName
}
