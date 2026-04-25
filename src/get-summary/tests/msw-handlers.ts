/* node modules */
import { http, HttpResponse, HttpHandler } from "msw";
import { API_ROOT } from "../../shared/index.js";

/* get summary: 200.OK */
const getSummaryHandler: HttpHandler = http.get(`${API_ROOT}/v3/summary.json`, async () => {
  return HttpResponse.json({
    page: {
      name: "Frankfurter",
      url: API_ROOT,
      status: "UP"
    }
  }, {status: 200});
});

/* get summary: 500.ISE */
const getSummaryErrorHandler: HttpHandler = http.get(`${API_ROOT}/v3/summary.json`, async () => {
  return HttpResponse.json(null, {status: 500, statusText: "Internal Server Error", headers: {'Content-Type': 'application/json'}});
});

/* exports */
export { getSummaryHandler, getSummaryErrorHandler };
