import AsyncStorage from '@react-native-community/async-storage';
import {compatibleStoreVersion} from '../env';

const version = 'ls:version';

export async function ensureCompatibility() {
  try {
    const stored = await AsyncStorage.getItem(version);
    if (stored && stored === JSON.stringify(compatibleStoreVersion)) {
      return false; // no need to update
    }
  } catch (error) {}
  return await resetCompatibility();
}

async function resetCompatibility() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    // force clear everything except for versioning (all reduxPersist:x and Parse:x keys)
    const targets = (keys || []).filter((k) => k !== version);
    if (targets.length) {
      await AsyncStorage.multiRemove(targets);
    }
    // after storage reset, update the compatibility to the current storage version
    return await updateCompatibility();
  } catch (error) {}
  return false;
}

async function updateCompatibility() {
  try {
    await AsyncStorage.setItem(version, JSON.stringify(compatibleStoreVersion));
    return true;
  } catch (error) {}
  return false;
}
