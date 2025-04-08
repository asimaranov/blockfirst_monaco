import TronWeb from 'tronweb';
import CryptoJS from 'crypto-js';

// Secret key for encrypting private keys - should be in env variables in production
const ENCRYPTION_SECRET =
  process.env.ENCRYPTION_SECRET || 'blockfirst-wallet-trc20-secret-key';

// TRC20 contract addresses
export const USDT_CONTRACT_ADDRESS = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

// Initialize TronWeb
const getTronWeb = () => {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io',
  });
};

// Generate a new wallet
export const generateWallet = async () => {
  const tronWeb = getTronWeb();
  const account = await tronWeb.createAccount();

  return {
    address: account.address.base58,
    hexAddress: account.address.hex,
    privateKey: account.privateKey,
  };
};

// Encrypt a private key before storing in DB
export const encryptPrivateKey = (privateKey: string): string => {
  return CryptoJS.AES.encrypt(privateKey, ENCRYPTION_SECRET).toString();
};

// Decrypt a private key
export const decryptPrivateKey = (encryptedKey: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedKey, ENCRYPTION_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Get USDT balance of an address
export const getUsdtBalance = async (address: string): Promise<number> => {
  const tronWeb = getTronWeb();

  let abi = [
    {
      'outputs': [{ 'type': 'uint256' }],
      'constant': true,
      'inputs': [{ 'name': 'who', 'type': 'address' }],
      'name': 'balanceOf',
      'stateMutability': 'View',
      'type': 'Function'
    },
    {
      'outputs': [{ 'type': 'bool' }],
      'inputs': [
        { 'name': '_to', 'type': 'address' },
        { 'name': '_value', 'type': 'uint256' }
      ],
      'name': 'transfer',
      'stateMutability': 'Nonpayable',
      'type': 'Function'
    },
  ];

  try {
    // Create contract instance
    const contract = await tronWeb.contract(abi, USDT_CONTRACT_ADDRESS);

    // Call balanceOf method
    const balance = await contract.balanceOf(address).call();

    // USDT has 6 decimals
    return parseInt(balance.toString()) / 1_000_000;
  } catch (error) {
    console.error('Error getting USDT balance:', error);
    return 0;
  }
};

// Check for TRC20 transaction
export const checkForTransaction = async (
  address: string,
  expectedAmount: number,
  startTimestamp: Date
): Promise<{ found: boolean; txId?: string }> => {
  const tronWeb = getTronWeb();
  const startTime = Math.floor(startTimestamp.getTime() / 1000);

  try {
    // Get transactions after the wallet was created
    const response = await fetch(
      `https://api.trongrid.io/v1/accounts/${address}/transactions/trc20?only_confirmed=true&limit=10&min_timestamp=${startTime * 1000}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'TRON-PRO-API-KEY': process.env.TRON_API_KEY || '',
        },
      }
    );

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      return { found: false };
    }

    // Find USDT transfer to this address with the expected amount
    const transaction = data.data.find((tx: any) => {
      return (
        tx.to === address &&
        tx.contract_address === USDT_CONTRACT_ADDRESS.toLowerCase() &&
        parseInt(tx.value) / 1_000_000 >= expectedAmount
      );
    });

    if (transaction) {
      return { found: true, txId: transaction.transaction_id };
    }

    return { found: false };
  } catch (error) {
    console.error('Error checking for transaction:', error);
    return { found: false };
  }
};

// Format TRC20 address for QR code
export const formatAddressForQR = (address: string, amount: number): string => {
  // Convert to microns (6 decimal places)
  const amountInMicrons = Math.floor(amount * 1_000_000);
  return `tron:${address}?amount=${amountInMicrons}&token=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`;
};
