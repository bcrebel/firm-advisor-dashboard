import { NextResponse } from "next/server";

const advisors = [
  {
    id: "REP123",
    name: "Sarah Johnson",
    dateAdded: "2020-01-15T09:00:00.000Z"
  },
  {
    id: "REP456",
    name: "Michael Chen",
    dateAdded: "2020-03-20T14:30:00.000Z"
  },
  {
    id: "REP789",
    name: "Emily Rodriguez",
    dateAdded: "2020-06-10T11:15:00.000Z"
  },
  {
    id: "REP234",
    name: "David Kim",
    dateAdded: "2020-02-05T10:45:00.000Z"
  },
  {
    id: "REP567",
    name: "Lisa Thompson",
    dateAdded: "2020-04-12T13:20:00.000Z"
  },
  {
    id: "REP890",
    name: "James Wilson",
    dateAdded: "2020-07-25T15:40:00.000Z"
  },
  {
    id: "REP345",
    name: "Patricia Garcia",
    dateAdded: "2020-08-30T09:15:00.000Z"
  },
  {
    id: "REP678",
    name: "Robert Taylor",
    dateAdded: "2020-09-18T11:50:00.000Z"
  },
  {
    id: "REP901",
    name: "Jennifer Martinez",
    dateAdded: "2020-10-05T14:25:00.000Z"
  },
  {
    id: "REP432",
    name: "Alexander Wright",
    dateAdded: "2020-11-15T16:30:00.000Z"
  },
  {
    id: "REP765",
    name: "Michelle Lee",
    dateAdded: "2020-12-20T10:10:00.000Z"
  },
  {
    id: "REP098",
    name: "Christopher Brown",
    dateAdded: "2021-01-08T13:45:00.000Z"
  },
  {
    id: "REP543",
    name: "Amanda Davis",
    dateAdded: "2021-02-14T15:20:00.000Z"
  },
  {
    id: "REP876",
    name: "Kevin Park",
    dateAdded: "2021-03-22T12:05:00.000Z"
  },
  {
    id: "REP210",
    name: "Rachel Anderson",
    dateAdded: "2021-04-30T09:40:00.000Z"
  },
  {
    id: "REP654",
    name: "Thomas White",
    dateAdded: "2021-05-17T11:25:00.000Z"
  },
  {
    id: "REP111",
    name: "Maria Lopez",
    dateAdded: "2021-06-28T14:50:00.000Z"
  },
  {
    id: "REP321",
    name: "Daniel Turner",
    dateAdded: "2021-07-15T16:15:00.000Z"
  },
  {
    id: "REP222",
    name: "Jessica Miller",
    dateAdded: "2021-08-23T10:30:00.000Z"
  },
  {
    id: "REP333",
    name: "William Santos",
    dateAdded: "2021-09-12T13:55:00.000Z"
  }
];

export async function GET() {
  return NextResponse.json(advisors);
}
