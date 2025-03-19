# Firm Advisor Dashboard
A dashboard for viewing financial advisors and their client accounts. Built with Next.js, TypeScript, and Tailwind CSS.

<img width="1417" alt="Screenshot 2025-03-19 at 5 07 34 PM" src="https://github.com/user-attachments/assets/2cd34cfe-4931-4d3b-a385-8f8721b7a8cf" />

## Getting Started

### Prerequisites

- Node.js (v20.9.0 or higher)
- npm (v9.8.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd firm-advisor-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

### Advisor Management
- View a list of financial advisors
- Sort advisors by name and number of accounts
- Select an advisor to view their details

### Account Overview
- Display all accounts associated with selected advisor
- View account details including:
  - Account name and number
  - Custodian information
  - Total holdings value
- Sort accounts by various criteria

### Account Details
- Interactive pie chart showing asset allocation
- Detailed breakdown of holdings by category
- Security-level detail including:
  - Ticker symbols
  - Number of units
  - Current value
  - Category classification

### User Interface
- Accessible components with keyboard navigation
- Loading states and error handling
- Modal dialogs for detailed information

## Potential Enhancements
- Responsive design that works on all screen sizes
- Navigation with tabs

## Technical Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR
- **Charts**: Recharts
- **State Management**: React Hooks

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Project Structure

```
app/
├── api/           # API routes
├── components/    # React components
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
└── page.tsx       # Main application page
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
