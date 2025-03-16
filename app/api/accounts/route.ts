import { NextResponse } from "next/server";

const accounts = [
  {
    name: "Bradley Green - 401k",
    number: "21889645",
    repId: "1271",
    holdings: [
      { ticker: "HEMCX", units: 77, unitPrice: 398.63 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Maria Santos - IRA",
    number: "21889646",
    repId: "8996",
    holdings: [
      { ticker: "ICKAX", units: 150, unitPrice: 245.30 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "Thomas Anderson - Roth IRA",
    number: "21889647",
    repId: "1272",
    holdings: [
      { ticker: "VFIAX", units: 200, unitPrice: 325.45 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Rachel Wong - Trust",
    number: "21889648",
    repId: "5521",
    holdings: [
      { ticker: "VTSAX", units: 180, unitPrice: 287.90 }
    ],
    custodian: "Vanguard"
  },
  {
    name: "Christopher Lee - 401k",
    number: "21889649",
    repId: "8997",
    holdings: [
      { ticker: "FCNTX", units: 95, unitPrice: 156.78 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "Amanda Brown - Investment",
    number: "21889650",
    repId: "1273",
    holdings: [
      { ticker: "SWPPX", units: 300, unitPrice: 167.89 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Daniel Park - IRA",
    number: "21889651",
    repId: "5522",
    holdings: [
      { ticker: "VFIAX", units: 120, unitPrice: 325.45 }
    ],
    custodian: "Vanguard"
  },
  {
    name: "Jessica Miller - Roth IRA",
    number: "21889652",
    repId: "1274",
    holdings: [
      { ticker: "HEMCX", units: 85, unitPrice: 398.63 }
    ],
    custodian: "Schwab"
  },
  {
    name: "William Turner - Trust",
    number: "21889653",
    repId: "8999",
    holdings: [
      { ticker: "ICKAX", units: 165, unitPrice: 245.30 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "Sofia Rodriguez - Investment",
    number: "21889654",
    repId: "5525",
    holdings: [
      { ticker: "VTSAX", units: 250, unitPrice: 287.90 }
    ],
    custodian: "Vanguard"
  },
  {
    name: "Michael Wright - 401k",
    number: "21889655",
    repId: "1278",
    holdings: [
      { ticker: "SWPPX", units: 280, unitPrice: 167.89 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Laura Chen - IRA",
    number: "21889656",
    repId: "9001",
    holdings: [
      { ticker: "FCNTX", units: 110, unitPrice: 156.78 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "Steven Lee - Trust",
    number: "21889657",
    repId: "1279",
    holdings: [
      { ticker: "VBTLX", units: 190, unitPrice: 178.45 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Karen Davis - Roth IRA",
    number: "21889658",
    repId: "5527",
    holdings: [
      { ticker: "FXAIX", units: 220, unitPrice: 298.67 }
    ],
    custodian: "Vanguard"
  },
  {
    name: "John Park - Investment",
    number: "21889659",
    repId: "9003",
    holdings: [
      { ticker: "SWTSX", units: 160, unitPrice: 234.56 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "Emily Anderson - 401k",
    number: "21889660",
    repId: "1281",
    holdings: [
      { ticker: "VGSLX", units: 140, unitPrice: 189.34 }
    ],
    custodian: "Schwab"
  },
  {
    name: "David White - IRA",
    number: "21889661",
    repId: "9004",
    holdings: [
      { ticker: "HEMCX", units: 95, unitPrice: 398.63 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "Sarah Lopez - Trust",
    number: "21889662",
    repId: "1282",
    holdings: [
      { ticker: "ICKAX", units: 175, unitPrice: 245.30 }
    ],
    custodian: "Schwab"
  },
  {
    name: "James Turner - Roth IRA",
    number: "21889663",
    repId: "5530",
    holdings: [
      { ticker: "VFIAX", units: 230, unitPrice: 325.45 }
    ],
    custodian: "Vanguard"
  },
  {
    name: "Lisa Miller - Investment",
    number: "21889664",
    repId: "1283",
    holdings: [
      { ticker: "VTSAX", units: 270, unitPrice: 287.90 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Robert Chen - 401k",
    number: "21889665",
    repId: "1271",
    holdings: [
      { ticker: "VWUSX", units: 180, unitPrice: 345.67 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Emma Thompson - Roth IRA",
    number: "21889666",
    repId: "8996",
    holdings: [
      { ticker: "FBALX", units: 220, unitPrice: 278.45 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "William Santos - Trust",
    number: "21889667",
    repId: "1272",
    holdings: [
      { ticker: "SWLGX", units: 310, unitPrice: 198.34 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Sophia Lee - Investment",
    number: "21889668",
    repId: "5521",
    holdings: [
      { ticker: "VWINX", units: 145, unitPrice: 267.89 }
    ],
    custodian: "Vanguard"
  },
  {
    name: "Lucas Wong - IRA",
    number: "21889669",
    repId: "8997",
    holdings: [
      { ticker: "FSMAX", units: 195, unitPrice: 187.65 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "Isabella Brown - 401k",
    number: "21889670",
    repId: "1273",
    holdings: [
      { ticker: "SWISX", units: 260, unitPrice: 156.78 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Mason Park - Trust",
    number: "21889671",
    repId: "5522",
    holdings: [
      { ticker: "VGHCX", units: 170, unitPrice: 432.10 }
    ],
    custodian: "Vanguard"
  },
  {
    name: "Ava Miller - Roth IRA",
    number: "21889672",
    repId: "1274",
    holdings: [
      { ticker: "FSKAX", units: 290, unitPrice: 223.45 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Ethan Wilson - Investment",
    number: "21889673",
    repId: "8999",
    holdings: [
      { ticker: "SWOBX", units: 240, unitPrice: 167.89 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "Oliver Garcia - IRA",
    number: "21889674",
    repId: "1275",
    holdings: [
      { ticker: "VDIGX", units: 185, unitPrice: 298.76 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Charlotte Taylor - 401k",
    number: "21889675",
    repId: "9000",
    holdings: [
      { ticker: "VWUSX", units: 210, unitPrice: 345.67 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "Henry Martinez - Trust",
    number: "21889676",
    repId: "1276",
    holdings: [
      { ticker: "FBALX", units: 165, unitPrice: 278.45 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Amelia Wright - Investment",
    number: "21889677",
    repId: "5525",
    holdings: [
      { ticker: "SWLGX", units: 320, unitPrice: 198.34 }
    ],
    custodian: "Vanguard"
  },
  {
    name: "Sebastian Lee - Roth IRA",
    number: "21889678",
    repId: "1277",
    holdings: [
      { ticker: "VWINX", units: 230, unitPrice: 267.89 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Victoria Brown - IRA",
    number: "21889679",
    repId: "1278",
    holdings: [
      { ticker: "FSMAX", units: 275, unitPrice: 187.65 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Jack Chen - Trust",
    number: "21889680",
    repId: "9001",
    holdings: [
      { ticker: "SWISX", units: 190, unitPrice: 156.78 }
    ],
    custodian: "Fidelity"
  },
  {
    name: "Scarlett Davis - 401k",
    number: "21889681",
    repId: "1279",
    holdings: [
      { ticker: "VGHCX", units: 245, unitPrice: 432.10 }
    ],
    custodian: "Schwab"
  },
  {
    name: "Theodore Park - Investment",
    number: "21889682",
    repId: "5527",
    holdings: [
      { ticker: "FSKAX", units: 155, unitPrice: 223.45 }
    ],
    custodian: "Vanguard"
  },
  {
    name: "Luna Anderson - Roth IRA",
    number: "21889683",
    repId: "1280",
    holdings: [
      { ticker: "SWOBX", units: 285, unitPrice: 167.89 }
    ],
    custodian: "Schwab"
  }
];

export async function GET() {
  return NextResponse.json(accounts);
}
