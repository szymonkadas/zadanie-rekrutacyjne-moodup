export function isSuccessfulValidation(
  errors: Partial<GenericObjectWithStrings>
) {
  return !Object.values(errors).filter((val) => val && val).length;
}

export type GenericObjectWithStrings = {
  [key: string]: string;
};
