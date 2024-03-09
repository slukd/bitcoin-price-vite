// tokenChooserB.ts

// Define a type for the token
type TokenB = 'XRP' | 'LTC';

// Function to choose a token
function chooseTokenB(token: TokenB): void {
  console.log(`Selected token B: ${token}`);
}

// Usage example
chooseTokenB('XRP'); // Output: Selected token B: XRP
chooseTokenB('LTC'); // Output: Selected token B: LTC
