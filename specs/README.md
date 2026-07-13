# Specs

This is a directory for test plans.
## Running Tests with Docker

No need to install Node.js or Playwright locally. Just run:

```bash
docker compose up --build
```

This will:
- Build the Docker image with all dependencies
- Run the Playwright tests using Chromium only
- Generate the HTML report in the `playwright-report/` folder on your machine

To view the report after the run:
```bash
npx playwright show-report
```
