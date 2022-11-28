export module EntityUtil {
  export const isValidId = (id?: number) => {
    return id && id > 0;
  }

  export const areValidIds = (ids?: number[]) => {
    return ids?.every(id => isValidId(id)) ?? false;
  }
}
