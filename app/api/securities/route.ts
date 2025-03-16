import { NextResponse } from "next/server";

const securities = [
  {
    id: "2e5012db-3a39-415d-93b4-8b1e3b453c6c",
    ticker: "HEMCX",
    name: "Hartford Emerging Markets Fund Class C",
    dateAdded: "2001-06-07T11:12:56.205Z"
  },
  {
    id: "3f6123ec-4b4a-526e-a4c5-9c2f4c564d7d",
    ticker: "ICKAX",
    name: "Delaware Ivy Crossover Credit Fund Class A",
    dateAdded: "2002-08-15T09:30:00.000Z"
  },
  {
    id: "4g7234fd-5c5b-637f-b5d6-ad3g5d675e8e",
    ticker: "VFIAX",
    name: "Vanguard 500 Index Fund Admiral Shares",
    dateAdded: "2000-11-23T14:45:30.500Z"
  },
  {
    id: "5h8345ge-6d6c-748g-c6e7-be4h6e786f9f",
    ticker: "VTSAX",
    name: "Vanguard Total Stock Market Index Fund Admiral Shares",
    dateAdded: "2000-12-01T10:20:15.750Z"
  },
  {
    id: "6i9456hf-7e7d-859h-d7f8-cf5i7f897g0g",
    ticker: "FCNTX",
    name: "Fidelity Contrafund",
    dateAdded: "2001-03-18T16:55:45.250Z"
  },
  {
    id: "7j0567ig-8f8e-960i-e8g9-dg6j8g908h1h",
    ticker: "SWPPX",
    name: "Schwab S&P 500 Index Fund",
    dateAdded: "2002-05-29T13:15:20.100Z"
  },
  {
    id: "8k1678jh-9g9f-071j-f9h0-eh7k9h019i2i",
    ticker: "VBTLX",
    name: "Vanguard Total Bond Market Index Fund Admiral Shares",
    dateAdded: "2003-01-14T08:40:10.300Z"
  },
  {
    id: "9l2789ki-0h0g-182k-g0i1-fi8l0i120j3j",
    ticker: "FXAIX",
    name: "Fidelity 500 Index Fund",
    dateAdded: "2003-04-22T15:25:35.900Z"
  },
  {
    id: "0m3890lj-1i1h-293l-h1j2-gj9m1j231k4k",
    ticker: "SWTSX",
    name: "Schwab Total Stock Market Index Fund",
    dateAdded: "2003-07-30T12:10:50.600Z"
  },
  {
    id: "1n4901mk-2j2i-304m-i2k3-hk0n2k342l5l",
    ticker: "VGSLX",
    name: "Vanguard Real Estate Index Fund Admiral Shares",
    dateAdded: "2003-09-05T17:35:25.800Z"
  }
];

export async function GET() {
  return NextResponse.json(securities);
}
