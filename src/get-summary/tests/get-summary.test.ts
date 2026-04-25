/* node modules */
import { jest } from "@jest/globals";

/* app imports */
import createMSWMockServer from "../../shared/create-msw-mock-server.js";
import { getAPISummary } from "../index.js";
import { getSummaryHandler, getSummaryErrorHandler } from "./msw-handlers.js";
import { API_ROOT } from "../../shared/index.js";

/* suite */
describe("Get API Summary", () => {
  /* create */
  let fetchSpy: jest.SpiedFunction<typeof global.fetch>;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  beforeAll(() => {
    mswServer = createMSWMockServer([getSummaryHandler]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy.mockRestore();
  });
  afterAll(() => mswServer.close());

  /* #1 */
  test("returns 200-OK response w. summary", async () => {
    /* fetch */
    fetchSpy = jest.spyOn(global, "fetch");
    const response = await getAPISummary();

    /* assert */
    expect(fetchSpy).toHaveBeenCalledWith(`${API_ROOT}/v3/summary.json`);
    expect(fetchSpy).toHaveReturnedTimes(1);
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
    fetchSpy = jest.spyOn(global, "fetch");
    mswServer.use(getSummaryErrorHandler);
    const response = await getAPISummary();

    /* assert */
    expect(fetchSpy).toHaveBeenCalledWith(`${API_ROOT}/v3/summary.json`);
    expect(fetchSpy).toHaveReturnedTimes(1);
    expect(response.code).toBe("api-fail");
    expect(response.message).toBe("[Fail]: Could Not Get API-Summary Status");
    expect(response.summary).toBeNull();
  });
});
