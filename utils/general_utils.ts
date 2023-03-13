import { ParsedUrlQuery } from "querystring";

/**
 * This function will read a param from the query, assuming it's a single value.
 * @example: query[param] = "uplifting,technology,lifestyle" (string) -> will return 'uplifting'
 */
function readSingleValueFromQuery(query: ParsedUrlQuery, param: string) {
  const value = query[param];
  return Array.isArray(value) ? value[0] : value?.split(',')[0];  
}

/**
 * This function will read a param from the query, assuming it's a list of values.
 * @example: query[param] = "uplifting,technology,lifestyle" (string) -> will return ['uplifting', 'technology', 'lifestyle']
 */
function readMultipleValuesFromQuery(query: ParsedUrlQuery, param: string) {
  const values = query[param];
  if (!values) {
    return [];
  }
  
  return Array.isArray(values) ? values : values.split(','); 
}

let debounceTimeout: number;
function debounce(callback: Function, delay: number = 250) {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(callback, delay);
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });  
}

export { readSingleValueFromQuery, readMultipleValuesFromQuery, debounce, formatDate };