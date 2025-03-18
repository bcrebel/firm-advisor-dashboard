import { NextResponse } from "next/server";

interface Holding {
  ticker: string;
  units: number;
  unitPrice: number;
}

interface Account {
  name: string;
  number: string;
  repId: string;
  custodian: string;
  holdings: Holding[];
}

// Helper function to generate holdings with slightly different quantities
function generateHoldings(baseHoldings: Holding[], multiplier = 1): Holding[] {
  return baseHoldings.map(holding => ({
    ...holding,
    units: Math.round(holding.units * (0.8 + (Math.random() * 0.4)) * multiplier)
  }));
}

// Base holdings templates
const retirementHoldings: Holding[] = [
  { ticker: "VFIAX", units: 150, unitPrice: 445.27 },
  { ticker: "VTSAX", units: 200, unitPrice: 89.54 },
  { ticker: "AAPL", units: 50, unitPrice: 175.21 },
  { ticker: "MSFT", units: 40, unitPrice: 338.11 },
  { ticker: "BRK.B", units: 25, unitPrice: 355.78 }
];

const growthHoldings: Holding[] = [
  { ticker: "TSLA", units: 30, unitPrice: 238.45 },
  { ticker: "NVDA", units: 45, unitPrice: 445.12 },
  { ticker: "GOOGL", units: 35, unitPrice: 125.30 },
  { ticker: "META", units: 60, unitPrice: 298.67 },
  { ticker: "AMZN", units: 25, unitPrice: 127.74 }
];

const conservativeHoldings: Holding[] = [
  { ticker: "VBTLX", units: 300, unitPrice: 10.12 },
  { ticker: "VWINX", units: 250, unitPrice: 25.45 },
  { ticker: "JNJ", units: 40, unitPrice: 156.85 },
  { ticker: "JPM", units: 55, unitPrice: 146.43 },
  { ticker: "VDIGX", units: 180, unitPrice: 35.67 }
];

const balancedHoldings: Holding[] = [
  { ticker: "FBALX", units: 275, unitPrice: 27.89 },
  { ticker: "SWPPX", units: 225, unitPrice: 65.34 },
  { ticker: "FXAIX", units: 190, unitPrice: 158.92 },
  { ticker: "SWTSX", units: 160, unitPrice: 72.45 },
  { ticker: "FSMAX", units: 210, unitPrice: 68.23 }
];

const internationalHoldings: Holding[] = [
  { ticker: "SWISX", units: 400, unitPrice: 22.31 },
  { ticker: "HEMCX", units: 350, unitPrice: 15.67 },
  { ticker: "ICKAX", units: 325, unitPrice: 18.45 },
  { ticker: "SWOBX", units: 275, unitPrice: 14.89 },
  { ticker: "SWLGX", units: 290, unitPrice: 31.22 }
];

// Generate accounts for each advisor
const advisorIds = [
  "REP123", "REP456", "REP789", "REP234", "REP567", 
  "REP890", "REP345", "REP678", "REP901", "REP432",
  "REP765", "REP098", "REP543", "REP876", "REP210",
  "REP654", "REP111", "REP321", "REP222", "REP333",
  "REP444", "REP555", "REP666", "REP777", "REP888",
  "REP999", "REP000", "REP1234", "REP5678", "REP9012"
];

const accounts: Account[] = [];
let accountNumber = 1;

advisorIds.forEach((repId, index) => {
  // Each advisor gets 5-8 accounts
  const numAccounts = 5 + Math.floor(Math.random() * 4);
  const accountTypes = [
    { name: "Retirement", holdings: retirementHoldings },
    { name: "Growth", holdings: growthHoldings },
    { name: "Conservative", holdings: conservativeHoldings },
    { name: "Balanced", holdings: balancedHoldings },
    { name: "International", holdings: internationalHoldings }
  ];

  for (let i = 0; i < numAccounts; i++) {
    const accountType = accountTypes[i % accountTypes.length];
    const suffix = String.fromCharCode(65 + Math.floor(i / accountTypes.length)); // A, B, C, etc.
    const custodians = ["Fidelity", "Charles Schwab", "Vanguard"];
    
    accounts.push({
      name: `${accountType.name} Fund ${suffix}`,
      number: `AC${String(accountNumber).padStart(3, '0')}`,
      repId: repId,
      custodian: custodians[i % custodians.length],
      holdings: generateHoldings(accountType.holdings, 0.8 + (index * 0.2))
    });
    accountNumber++;
  }
});

export async function GET() {
  return NextResponse.json(accounts);
}
