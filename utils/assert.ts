type Defined<T> = NonNullable<T> // copy type to avoid undefined confusion

export const assertDefined = <T>(
  value: T,
  errorMessage: string | null = null
): asserts value is Defined<T> => {
  if (value === null || value === undefined) {
    throw new Error(errorMessage ?? 'Value can not be null or undefined')
  }
}
