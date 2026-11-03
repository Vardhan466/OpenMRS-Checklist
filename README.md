# OpenMRS-Checklist

Automated end-to-end test suite for the [OpenMRS](https://openmrs.org/) patient management system using [Playwright](https://playwright.dev/).

## 📋 Overview

This project contains 15 Playwright test cases covering key OpenMRS workflows such as:
- Patient login and navigation
- Add / search / edit patient records
- And more OpenMRS patient management scenarios

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/)
- Google Chrome browser

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Vardhan466/OpenMRS-Checklist.git
cd OpenMRS-Checklist
```

### 2. Install dependencies

```bash
npm install
npx playwright install
```

### 3. Run all tests

```bash
npx playwright test
```

### 4. Run a specific test file

```bash
npx playwright test tests/testcase1.spec.ts
```

### 5. View HTML test report

```bash
npx playwright show-report
```

## 🧪 Test Cases

| File | Description |
|------|-------------|
| `testcase1.spec.ts` | Login and navigate to Add Patient |
| `testcase2.spec.ts` | Test case 2 |
| `testcase3.spec.ts` | Test case 3 |
| `testcase4.spec.ts` | Test case 4 |
| `testcase5.spec.ts` | Test case 5 |
| `testcase6.spec.ts` | Test case 6 |
| `testcase7.spec.ts` | Test case 7 |
| `testcase8.spec.ts` | Test case 8 |
| `testcase9.spec.ts` | Test case 9 |
| `testcase10.spec.ts` | Test case 10 |
| `testcase11.spec.ts` | Test case 11 |
| `testcase12.spec.ts` | Test case 12 |
| `testcase13.spec.ts` | Test case 13 |
| `testcase14.spec.ts` | Test case 14 |
| `testcase15.spec.ts` | Test case 15 |

## ⚙️ Configuration

Tests are configured in [`playwright.config.ts`](./playwright.config.ts). By default they run on **Google Chrome**.

The target OpenMRS instance is: `https://test3.openmrs.org/openmrs/spa/`

## 📁 Project Structure

```
OpenMRS-Checklist/
├── tests/                  # All Playwright test specs
│   ├── testcase1.spec.ts
│   ├── testcase2.spec.ts
│   └── ... (15 total)
├── playwright.config.ts    # Playwright configuration
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## 📄 License

ISC
