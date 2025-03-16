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
  }
];

export async function GET() {
  return NextResponse.json(accounts);
}
