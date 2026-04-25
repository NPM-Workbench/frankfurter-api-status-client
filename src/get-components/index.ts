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
    const data = await response.json();
    return {code: "api-ok", message: "No Errors. Check Components Info.", components: data.components};
  } catch (error) {
    console.error(error);
    return {code: "api-fail", message: "[Fail]: Could Not Get API-Component Status", components: null}
  }
}

/* exports */
export { getAPIComponents };
