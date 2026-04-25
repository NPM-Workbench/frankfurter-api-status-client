![banner](https://github.com/user-attachments/assets/4a717541-bf2a-4674-bdb6-d2e699497000)
![npm](https://img.shields.io/npm/v/frankfurter-api-status-client)
![downloads](https://img.shields.io/npm/dw/frankfurter-api-status-client)
![license](https://img.shields.io/npm/l/frankfurter-api-status-client)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/frankfurter-api-status-client)

# frankfurter-api-status-client

A lightweight, type-safe JavaScript/TypeScript client for the <b>Frankfurter API Status Page</b>, designed for developers who want a minimal way to check service health and inspect public status information. This package wraps the Frankfurter status endpoints with a small promise-based API and predictable success/failure responses.
<br/><br/>

### 📦 Installation

```console
npm install frankfurter-api-status-client
```

💡 Note: This package reads from the public [Frankfurter API status page](https://frankfurter.instatus.com). No API Keys are required. The current package version supports the public **Frankfurter Status API** endpoints exposed via Instatus.

### 📘 Features

1. TypeScript-first with exported type definitions
2. Lightweight wrapper around Frankfurter public status endpoints
3. Simple promise-based API for summary and component health checks
4. Zero runtime configuration required
5. Works in both Node.js environments with `fetch` support and modern browsers

### 🔤 Example Usage

1. 📁 Get API Status Summary

```javascript
import { getAPISummary } from 'frankfurter-api-status-client';

async function myFunc() {
  const response = await getAPISummary();
  console.log(response);
}
/* fetch */
await myFunc();

/*
{
  code: "api-ok",
  message: "No Errors. Check Summary.",
  summary: {
    page: { ... },
    components: [ ... ],
    incidents: [ ... ],
    scheduled_maintenances: [ ... ]
  }
}
*/
```

2. 📁 Get API Status Components

```javascript
import { getAPIComponents } from 'frankfurter-api-status-client';

async function myFunc() {
  const response = await getAPIComponents();
  console.log(response);
}
/* fetch */
await myFunc();

/*
{
  code: "api-ok",
  message: "No Errors. Check Components Info.",
  components: [
    {
      id: "...",
      name: "...",
      status: "OPERATIONAL"
    }
    ...
  ]
}
*/
```

### 📗 Test Coverage

```
PASS src/get-summary/tests/get-summary.test.ts
  Get API Summary
    ✓ returns 200-OK response w. summary
    ✓ returns 500-ISE response no summary

PASS src/get-components/tests/get-components.test.ts
  Get API Components
    ✓ returns 200-OK response w. components
    ✓ returns 500-ISE response no components

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
```

```
----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------------|---------|----------|---------|---------|-------------------
All files                   |     100 |      100 |     100 |     100 |
 get-components             |     100 |      100 |     100 |     100 |
  index.ts                  |     100 |      100 |     100 |     100 |
 get-components/tests       |     100 |      100 |     100 |     100 |
  msw-handlers.ts           |     100 |      100 |     100 |     100 |
 get-summary                |     100 |      100 |     100 |     100 |
  index.ts                  |     100 |      100 |     100 |     100 |
 get-summary/tests          |     100 |      100 |     100 |     100 |
  msw-handlers.ts           |     100 |      100 |     100 |     100 |
 shared                     |     100 |      100 |     100 |     100 |
  create-msw-mock-server.ts |     100 |      100 |     100 |     100 |
  index.ts                  |     100 |      100 |     100 |     100 |
----------------------------|---------|----------|---------|---------|-------------------
```

### 📘 Contributing

Contributions, suggestions, and improvements are welcome.<br/>
Feel free to open issues or pull requests.

### ❤️ Support

Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
