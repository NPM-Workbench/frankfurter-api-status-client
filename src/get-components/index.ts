/* imports */
import { API_ROOT } from "../shared/index.js";
import { TAPIResponse } from "../types/index.js";

/* types */
type TOutput = TAPIResponse & {
  components: Record<string, any>[] | null
};

/* module */
async function getAPIComponents(): Promise<TOutput> {
  try {
    /* fetch */
    const API_URL = `${API_ROOT}/v3/components.json`;
    const response = await fetch(API_URL);

    /* end */
    const code = !(response.ok) ? "api-fail" : "api-ok";
    const message = !(response.ok) ? "[Fail]: Could Not Get API-Component Status" : "No Errors. Check Components Info.";
    const components = !(response.ok) ? null : (await response.json()).components;

    return { code, message, components };
  } catch (error) {
    console.error("[Frankfurter]: Get API Components Err - ", error);
    return {code: "api-fail", message: "[Fail]: Could Not Get API-Component Status", components: null};
  }
}

/* exports */
export { getAPIComponents };
