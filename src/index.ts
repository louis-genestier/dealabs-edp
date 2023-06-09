import { Redis } from "./lib/redis";

// import { Payload } from "./lib/payload";

(async () => {
  const redis = await Redis.create();
  await redis.set("currentPage", 354);
  const currentPage = await redis.get("currentPage");
  console.log(currentPage);
  // const payload = new Payload(354);
  // const generatedValue = await payload.generateParameter();

  // const fetcher = new DealabsResponse(generatedValue);
  // const data = await fetcher.getResponse();

  // const comments = fetcher.getComments(data);

  // console.log(comments);

  await redis.disconnect();
})();
