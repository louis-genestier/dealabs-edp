import { DealabsResponse } from "./lib/dealabsResponse";
import { Payload } from "./lib/payload";

(async () => {
  const payload = new Payload(354);
  const generatedValue = await payload.generateParameter();

  const fetcher = new DealabsResponse(generatedValue);
  const data = await fetcher.getResponse();

  const comments = fetcher.getComments(data);

  console.log(comments);
})();
