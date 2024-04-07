const EMPTY_SLOT = Symbol();
/** Used to more precisely differentiate between passed and not passed generic type
 * ("never" can be inaccurate) */
export type EmptySlot = typeof EMPTY_SLOT;
