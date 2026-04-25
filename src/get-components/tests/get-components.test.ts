/* imports */
import createMSWMockServer from "../../shared/create-msw-mock-server.js";
import { getAPIComponents } from "../index.js";
import { getComponentsHandler, getComponentsErrorHandler } from "./msw-handlers.js";

/* suite */
describe("Get API Components", () => {
  /* create */
  let mswServer: ReturnType<typeof createMSWMockServer>;

  beforeAll(() => {
    mswServer = createMSWMockServer([getComponentsHandler]);
    mswServer.listen();
  });
  afterEach(() => mswServer.resetHandlers());
  afterAll(() => mswServer.close());

  /* #1 */
  test("returns 200-OK response w. components", async () => {
    /* fetch */
    const response = await getAPIComponents();

    /* assert */
    expect(response.code).toBe("api-ok");
    expect(response.message).toBe("No Errors. Check Components Info.");
    expect(response.components?.length).toBeGreaterThan(0);
  });

  /* #2 */
  test("returns 500-ISE response no components", async () => {
    /* fetch */
    mswServer.use(getComponentsErrorHandler);
    const response = await getAPIComponents();

    /* assert */
    expect(response.code).toBe("api-fail");
    expect(response.message).toBe("[Fail]: Could Not Get API-Component Status");
    expect(response.components).toBeNull();
  });
});
