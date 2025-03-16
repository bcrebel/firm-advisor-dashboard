import { NextResponse } from "next/server";

const advisors = [
  {
    id: "1",
    name: "Randall Morrison",
    custodians: [
      { name: "Schwab", repId: "1271" },
      { name: "Fidelity", repId: "8996" }
    ]
  },
  {
    id: "2",
    name: "Sarah Johnson",
    custodians: [
      { name: "Schwab", repId: "1272" },
      { name: "Vanguard", repId: "5521" }
    ]
  },
  {
    id: "3",
    name: "Michael Chen",
    custodians: [
      { name: "Fidelity", repId: "8997" }
    ]
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    custodians: [
      { name: "Schwab", repId: "1273" },
      { name: "Fidelity", repId: "8998" }
    ]
  },
  {
    id: "5",
    name: "David Kim",
    custodians: [
      { name: "Vanguard", repId: "5522" }
    ]
  },
  {
    id: "6",
    name: "Lisa Thompson",
    custodians: [
      { name: "Schwab", repId: "1274" },
      { name: "Vanguard", repId: "5523" }
    ]
  },
  {
    id: "7",
    name: "James Wilson",
    custodians: [
      { name: "Fidelity", repId: "8999" },
      { name: "Vanguard", repId: "5524" }
    ]
  },
  {
    id: "8",
    name: "Patricia Garcia",
    custodians: [
      { name: "Schwab", repId: "1275" }
    ]
  },
  {
    id: "9",
    name: "Robert Taylor",
    custodians: [
      { name: "Fidelity", repId: "9000" },
      { name: "Schwab", repId: "1276" }
    ]
  },
  {
    id: "10",
    name: "Jennifer Martinez",
    custodians: [
      { name: "Vanguard", repId: "5525" },
      { name: "Schwab", repId: "1277" }
    ]
  },
  {
    id: "11",
    name: "Alexander Wright",
    custodians: [
      { name: "Schwab", repId: "1278" },
      { name: "Fidelity", repId: "9001" }
    ]
  },
  {
    id: "12",
    name: "Michelle Lee",
    custodians: [
      { name: "Vanguard", repId: "5526" },
      { name: "Schwab", repId: "1279" }
    ]
  },
  {
    id: "13",
    name: "Christopher Brown",
    custodians: [
      { name: "Fidelity", repId: "9002" }
    ]
  },
  {
    id: "14",
    name: "Amanda Davis",
    custodians: [
      { name: "Schwab", repId: "1280" },
      { name: "Vanguard", repId: "5527" }
    ]
  },
  {
    id: "15",
    name: "Kevin Park",
    custodians: [
      { name: "Fidelity", repId: "9003" }
    ]
  },
  {
    id: "16",
    name: "Rachel Anderson",
    custodians: [
      { name: "Vanguard", repId: "5528" },
      { name: "Schwab", repId: "1281" }
    ]
  },
  {
    id: "17",
    name: "Thomas White",
    custodians: [
      { name: "Fidelity", repId: "9004" },
      { name: "Vanguard", repId: "5529" }
    ]
  },
  {
    id: "18",
    name: "Maria Lopez",
    custodians: [
      { name: "Schwab", repId: "1282" }
    ]
  },
  {
    id: "19",
    name: "Daniel Turner",
    custodians: [
      { name: "Vanguard", repId: "5530" },
      { name: "Fidelity", repId: "9005" }
    ]
  },
  {
    id: "20",
    name: "Jessica Miller",
    custodians: [
      { name: "Schwab", repId: "1283" },
      { name: "Vanguard", repId: "5531" }
    ]
  }
];

export async function GET() {
  return NextResponse.json(advisors);
}
