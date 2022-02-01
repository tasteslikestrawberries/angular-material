//SORTING FUNCTION
export const sort = (
  a: number | string | Date,
  b: number | string | Date,
  isAsc: boolean
) => (a < b ? -1 : 1) * (isAsc ? 1 : -1); //multiplying two numbers
