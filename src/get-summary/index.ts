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
    const summary = await response.json();
    return {code: "api-ok", message: "No Errors. Check Summary.", summary};
  } catch (error) {
    console.error(error);
    return {code: "api-fail", message: "[Fail]: Could Not Get API-Summary Status", summary: null}
  }
}

/* exports */
export { getAPISummary };
