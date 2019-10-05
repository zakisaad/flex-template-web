/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'coal',
    label: 'Coal',
  },
  {
    key: 'flavour',
    label: 'Flavour',
  },
  {
    key: 'gas_stove',
    label: 'Gas stove',
  },
  {
    key: 'tongs',
    label: 'Tongs',
  },
];

export const categories = [
  { key: 'set_one', label: 'One Shisha' },
  { key: 'set_two', label: 'Two Shishas' },
  { key: 'set_three', label: 'Three Shishas' },
  { key: 'set_n', label: 'Four+ Shishas' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};
