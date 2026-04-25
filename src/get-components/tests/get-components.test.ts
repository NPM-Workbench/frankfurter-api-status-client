/* node modules */
import { jest } from "@jest/globals";

/* app imports */
import createMSWMockServer from "../../shared/create-msw-mock-server.js";
import { getAPIComponents } from "../index.js";
import { getComponentsHandler, getComponentsErrorHandler } from "./msw-handlers.js";
import { API_ROOT } from "../../shared/index.js";

/* suite */
describe("Get API Components", () => {
  /* create */
  let fetchSpy: jest.SpiedFunction<typeof global.fetch>;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  beforeAll(() => {
    mswServer = createMSWMockServer([getComponentsHandler]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy.mockRestore();
  });
  afterAll(() => mswServer.close());

  /* #1 */
  test("returns 200-OK response w. components", async () => {
    /* fetch */
    fetchSpy = jest.spyOn(global, "fetch");
    const response = await getAPIComponents();

    /* assert */
    expect(fetchSpy).toHaveBeenCalledWith(`${API_ROOT}/v3/components.json`);
    expect(fetchSpy).toHaveReturnedTimes(1);
    expect(response.code).toBe("api-ok");
    expect(response.message).toBe("No Errors. Check Components Info.");
    expect(response.components?.length).toBeGreaterThan(0);
  });

  /* #2 */
  test("returns 500-ISE response no components", async () => {
    /* fetch */
    fetchSpy = jest.spyOn(global, "fetch");
    mswServer.use(getComponentsErrorHandler);
    const response = await getAPIComponents();

    /* assert */
    expect(fetchSpy).toHaveBeenCalledWith(`${API_ROOT}/v3/components.json`);
    expect(fetchSpy).toHaveReturnedTimes(1);
    expect(response.code).toBe("api-fail");
    expect(response.message).toBe("[Fail]: Could Not Get API-Component Status");
    expect(response.components).toBeNull();
  });
});
