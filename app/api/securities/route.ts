import { NextResponse } from "next/server";

const securities = [
  {
    id: "2e5012db-3a39-415d-93b4-8b1e3b453c6c",
    ticker: "HEMCX",
    name: "Hartford Emerging Markets Fund Class C",
    dateAdded: "2001-06-07T11:12:56.205Z",
    categoryId: 8
  },
  {
    id: "3f6123ec-4b4a-526e-a4c5-9c2f4c564d7d",
    ticker: "ICKAX",
    name: "Delaware Ivy Crossover Credit Fund Class A",
    dateAdded: "2002-08-15T09:30:00.000Z",
    categoryId: 13
  },
  {
    id: "4g7234fd-5c5b-637f-b5d6-ad3g5d675e8e",
    ticker: "VFIAX",
    name: "Vanguard 500 Index Fund Admiral Shares",
    dateAdded: "2000-11-23T14:45:30.500Z",
    categoryId: 3
  },
  {
    id: "5h8345ge-6d6c-748g-c6e7-be4h6e786f9f",
    ticker: "VTSAX",
    name: "Vanguard Total Stock Market Index Fund Admiral Shares",
    dateAdded: "2000-12-01T10:20:15.750Z",
    categoryId: 2
  },
  {
    id: "6i9456hf-7e7d-859h-d7f8-cf5i7f897g0g",
    ticker: "FCNTX",
    name: "Fidelity Contrafund",
    dateAdded: "2001-03-18T16:55:45.250Z",
    categoryId: 3
  },
  {
    id: "7j0567ig-8f8e-960i-e8g9-dg6j8g908h1h",
    ticker: "SWPPX",
    name: "Schwab S&P 500 Index Fund",
    dateAdded: "2002-05-29T13:15:20.100Z",
    categoryId: 3
  },
  {
    id: "8k1678jh-9g9f-071j-f9h0-eh7k9h019i2i",
    ticker: "VBTLX",
    name: "Vanguard Total Bond Market Index Fund Admiral Shares",
    dateAdded: "2003-01-14T08:40:10.300Z",
    categoryId: 11
  },
  {
    id: "9l2789ki-0h0g-182k-g0i1-fi8l0i120j3j",
    ticker: "FXAIX",
    name: "Fidelity 500 Index Fund",
    dateAdded: "2003-04-22T15:25:35.900Z",
    categoryId: 3
  },
  {
    id: "0m3890lj-1i1h-293l-h1j2-gj9m1j231k4k",
    ticker: "SWTSX",
    name: "Schwab Total Stock Market Index Fund",
    dateAdded: "2003-07-30T12:10:50.600Z",
    categoryId: 2
  },
  {
    id: "1n4901mk-2j2i-304m-i2k3-hk0n2k342l5l",
    ticker: "VGSLX",
    name: "Vanguard Real Estate Index Fund Admiral Shares",
    dateAdded: "2003-09-05T17:35:25.800Z",
    categoryId: 16
  },
  {
    id: "2o5012nl-3k3j-415n-j3l4-il1o3l453m6m",
    ticker: "VWUSX",
    name: "Vanguard U.S. Growth Fund Admiral Shares",
    dateAdded: "2003-10-15T14:20:30.400Z",
    categoryId: 3
  },
  {
    id: "3p6123om-4l4k-526o-k4m5-jm2p4m564n7n",
    ticker: "FBALX",
    name: "Fidelity Balanced Fund",
    dateAdded: "2003-11-20T11:45:15.200Z",
    categoryId: 5
  },
  {
    id: "4q7234pn-5m5l-637p-l5n6-kn3q5n675o8o",
    ticker: "SWLGX",
    name: "Schwab Large-Cap Growth Index Fund",
    dateAdded: "2003-12-25T09:30:40.100Z",
    categoryId: 3
  },
  {
    id: "5r8345qo-6n6m-748q-m6o7-lo4r6o786p9p",
    ticker: "VWINX",
    name: "Vanguard Wellesley Income Fund Admiral Shares",
    dateAdded: "2004-01-30T16:15:20.300Z",
    categoryId: 5
  },
  {
    id: "6s9456rp-7o7n-859r-n7p8-mp5s7p897q0q",
    ticker: "FSMAX",
    name: "Fidelity Extended Market Index Fund",
    dateAdded: "2004-03-05T13:50:45.500Z",
    categoryId: 4
  },
  {
    id: "7t0567sq-8p8o-960s-o8q9-nq6t8q908r1r",
    ticker: "SWISX",
    name: "Schwab International Index Fund",
    dateAdded: "2004-04-10T10:25:30.700Z",
    categoryId: 7
  },
  {
    id: "8u1678tr-9q9p-071t-p9r0-or7u9r019s2s",
    ticker: "VGHCX",
    name: "Vanguard Health Care Fund Admiral Shares",
    dateAdded: "2004-05-15T08:40:15.900Z",
    categoryId: 5
  },
  {
    id: "9v2789us-0r0q-182u-q0s1-ps8v0s120t3t",
    ticker: "FSKAX",
    name: "Fidelity Total Market Index Fund",
    dateAdded: "2004-06-20T15:15:50.100Z",
    categoryId: 2
  },
  {
    id: "0w3890vt-1s1r-293v-r1t2-qt9w1t231u4u",
    ticker: "SWOBX",
    name: "Schwab Target 2060 Index Fund",
    dateAdded: "2004-07-25T12:30:25.300Z",
    categoryId: 5
  },
  {
    id: "1x4901wu-2t2s-304w-s2u3-ru0x2u342v5v",
    ticker: "VDIGX",
    name: "Vanguard Dividend Growth Fund",
    dateAdded: "2004-08-30T09:55:10.500Z",
    categoryId: 3
  },
  {
    id: "2y5012xv-3u3t-415x-t3v4-sv1y3v453w6w",
    ticker: "AMZN",
    name: "Amazon.com Inc",
    dateAdded: "2004-09-05T10:15:20.600Z",
    categoryId: 3
  },
  {
    id: "3z6123yw-4v4u-526y-u4w5-tw2z4w564x7x",
    ticker: "AAPL",
    name: "Apple Inc",
    dateAdded: "2004-09-10T11:30:40.700Z",
    categoryId: 3
  },
  {
    id: "4a7234zx-5w5v-637z-v5x6-ux3a5x675y8y",
    ticker: "MSFT",
    name: "Microsoft Corporation",
    dateAdded: "2004-09-15T12:45:50.800Z",
    categoryId: 3
  },
  {
    id: "5b8345ay-6x6w-748a-w6y7-vy4b6y786z9z",
    ticker: "GOOGL",
    name: "Alphabet Inc Class A",
    dateAdded: "2004-09-20T13:55:30.900Z",
    categoryId: 3
  },
  {
    id: "6c9456bz-7y7x-859b-x7z8-wz5c7z897a0a",
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    dateAdded: "2004-09-25T14:20:45.100Z",
    categoryId: 3
  },
  {
    id: "7d0567ca-8z8y-960c-y8a9-xa6d8a908b1b",
    ticker: "TSLA",
    name: "Tesla Inc",
    dateAdded: "2004-09-30T15:35:55.200Z",
    categoryId: 3
  },
  {
    id: "8e1678db-9a9z-071d-z9b0-yb7e9b019c2c",
    ticker: "META",
    name: "Meta Platforms Inc",
    dateAdded: "2004-10-05T16:50:15.300Z",
    categoryId: 3
  },
  {
    id: "9f2789ec-0b0a-182e-a0c1-zc8f0c120d3d",
    ticker: "BRK.B",
    name: "Berkshire Hathaway Inc Class B",
    dateAdded: "2004-10-10T17:05:25.400Z",
    categoryId: 3
  },
  {
    id: "0g3890fd-1c1b-293f-b1d2-ad9g1d231e4e",
    ticker: "JPM",
    name: "JPMorgan Chase & Co",
    dateAdded: "2004-10-15T18:20:35.500Z",
    categoryId: 3
  },
  {
    id: "1h4901ge-2d2c-304g-c2e3-be0h2e342f5f",
    ticker: "JNJ",
    name: "Johnson & Johnson",
    dateAdded: "2004-10-20T19:35:45.600Z",
    categoryId: 3
  }
];

export async function GET() {
  return NextResponse.json(securities);
}
