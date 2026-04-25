/* imports */
import { API_ROOT } from "../shared/index.js";
import { TAPIResponse } from "../types/index.js";

/* types */
type TOutput = TAPIResponse & {
  summary: Record<string, any> | null
};

/* module */
async function getAPISummary(): Promise<TOutput> {
  try {
    /* fetch */
    const API_URL = `${API_ROOT}/v3/summary.json`;
    const response = await fetch(API_URL);

    /* end */
    const code = !(response.ok) ? "api-fail" : "api-ok";
    const message = !(response.ok) ? "[Fail]: Could Not Get API-Summary Status" : "No Errors. Check Summary.";
    const summary = !(response.ok) ? null : await response.json();
    return { code, message, summary };
  } catch (error) {
    console.error("[Frankfurter]: Get API Summary Err - ", error);
    return {code: "api-fail", message: "[Fail]: Could Not Get API-Summary Status", summary: null};
  }
}

/* exports */
export { getAPISummary };
