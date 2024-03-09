// tokenChooserA.ts

// Define a type for the token
type TokenA = 'BTC' | 'ETH';

// Function to choose a token
function chooseTokenA(token: TokenA): void {
  console.log(`Selected token A: ${token}`);
}

// Usage example
chooseTokenA('BTC'); // Output: Selected token A: BTC
chooseTokenA('ETH'); // Output: Selected token A: ETH
