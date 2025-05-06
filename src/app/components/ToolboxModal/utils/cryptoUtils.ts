import { keccak256 as ethersKeccak256 } from 'ethers';
import { sha256 as ethersSha256 } from 'ethers';
import { recoverAddress } from 'ethers';

/**
 * Computes the keccak256 hash of a value
 * @param value The value to hash
 * @returns The keccak256 hash of the value
 */
export const keccak256 = (value: string): string => {
  try {
    // If input is hex without 0x prefix, add it
    const normalizedInput = value.startsWith('0x')
      ? value
      : /^[0-9a-fA-F]+$/.test(value)
        ? `0x${value}`
        : value;

    // If input is a hex value, use it directly, otherwise convert to UTF-8 bytes
    const hash = /^0x[0-9a-fA-F]+$/.test(normalizedInput)
      ? ethersKeccak256(normalizedInput)
      : ethersKeccak256(new TextEncoder().encode(value));

    return hash;
  } catch (error) {
    console.error('Error computing keccak256 hash:', error);
    return '';
  }
};

/**
 * Computes the SHA-256 hash of a value
 * @param value The value to hash
 * @returns The SHA-256 hash of the value
 */
export const sha256 = (value: string): string => {
  try {
    // If input is hex without 0x prefix, add it
    const normalizedInput = value.startsWith('0x')
      ? value
      : /^[0-9a-fA-F]+$/.test(value)
        ? `0x${value}`
        : value;

    // If input is a hex value, use it directly, otherwise convert to UTF-8 bytes
    const hash = /^0x[0-9a-fA-F]+$/.test(normalizedInput)
      ? ethersSha256(normalizedInput)
      : ethersSha256(new TextEncoder().encode(value));

    return hash;
  } catch (error) {
    console.error('Error computing SHA-256 hash:', error);
    return '';
  }
};

/**
 * Recovers the address from a signature and message
 * @param signature The signature string
 * @param message The original message that was signed
 * @returns The recovered address
 */
export const ecrecover = (signature: string, message: string): string => {
  try {
    // Normalize inputs
    const normalizedSignature = signature.startsWith('0x')
      ? signature
      : `0x${signature}`;

    // If message is already a hash, use it directly, otherwise hash it first
    let messageHash;
    if (/^0x[0-9a-fA-F]{64}$/.test(message)) {
      messageHash = message;
    } else {
      // Hash the message if it's not already a hash
      messageHash = keccak256(message);
    }

    // Recover the address
    const address = recoverAddress(messageHash, normalizedSignature);
    return address;
  } catch (error) {
    console.error('Error recovering address:', error);
    return '';
  }
};
