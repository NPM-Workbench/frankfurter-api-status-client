/* imports */
import createMSWMockServer from "../../shared/create-msw-mock-server.js";
import { getAPISummary } from "../index.js";
import { getSummaryHandler, getSummaryErrorHandler } from "./msw-handlers.js";

/* suite */
describe("Get API Summary", () => {
  /* create */
  let mswServer: ReturnType<typeof createMSWMockServer>;

  beforeAll(() => {
    mswServer = createMSWMockServer([getSummaryHandler]);
    mswServer.listen();
  });
  afterEach(() => mswServer.resetHandlers());
  afterAll(() => mswServer.close());

  /* #1 */
  test("returns 200-OK response w. summary", async () => {
    /* fetch */
    const response = await getAPISummary();

    /* assert */
    expect(response.code).toBe("api-ok");
    expect(response.message).toBe("No Errors. Check Summary.");
    expect(response.summary).toEqual({
      page: {
        name: 'Frankfurter',
        url: 'https://frankfurter.instatus.com',
        status: 'UP'
      }
    })
  });

  /* #2 */
  test("returns 500-ISE response no summary", async () => {
    /* fetch */
    mswServer.use(getSummaryErrorHandler);
    const response = await getAPISummary();

    /* assert */
    expect(response.code).toBe("api-fail");
    expect(response.message).toBe("[Fail]: Could Not Get API-Summary Status");
    expect(response.summary).toBeNull();
  });
});
