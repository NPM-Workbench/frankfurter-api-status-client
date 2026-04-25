/* imports */
import { API_ROOT } from "../shared/index.js";
import { TAPIResponse } from "../types/index.js";

/* types */
type TOutput = TAPIResponse & {
  components: Record<string, any>[] | null
};

/* module */
async function getAPIComponents(): Promise<TOutput> {
  /* fetch */
  const API_URL = `${API_ROOT}/v3/components.json`;
  const response = await fetch(API_URL);

  /* end */
  const data = await response.json();
  const code = !(response.ok) ? "api-fail" : "api-ok";
  const message = !(response.ok) ? "[Fail]: Could Not Get API-Component Status" : "No Errors. Check Components Info.";
  const components = !(response.ok) ? null : data.components;

  return { code, message, components };
}

/* exports */
export { getAPIComponents };
