/* node modules */
import { http, HttpResponse, HttpHandler } from "msw";
import { API_ROOT } from "../../shared/index.js";

/* get components: 200.OK */
const getComponentsHandler: HttpHandler = http.get(`${API_ROOT}/v3/components.json`, async () => {
  return HttpResponse.json({
    "components": [
        {
          "id": "1",
          "name": "API",
          "description": "example-description",
          "status": "OPERATIONAL",
          "group": null
        }
    ]
  }, {status: 200});
});

/* get components: 500.ISE */
const getComponentsErrorHandler: HttpHandler = http.get(`${API_ROOT}/v3/components.json`, async () => {
  return HttpResponse.json(null, {status: 500, statusText: "Internal Server Error", headers: {'Content-Type': 'application/json'}});
});

/* exports */
export { getComponentsHandler, getComponentsErrorHandler };
