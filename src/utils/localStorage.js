export const storeSet = (store, key, value) => {
  let common = localStorage[store];
  common = (common ? JSON.parse(common) : {});
  common.value = common.value ? common.value : {};

  common.value[key] = value;
  localStorage[store] = JSON.stringify(common);
}

export const storeGet = (store, key) => {
  let common = localStorage[store];
  common = (common ? JSON.parse(common) : {});
  common.value = common.value ? common.value : {};

  return common.value[key];
}
