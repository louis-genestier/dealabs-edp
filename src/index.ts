import { Redis } from "./lib/redis";
import { Payload } from "./lib/payload";
import { DealabsApi } from "./lib/dealabsApi";
import { Comment } from "./type/response";
import { Telegram } from "./lib/telegram";
import { logger } from "./lib/logger";

const getNewComments = (
  comments: Comment[],
  lastCommentId: string
): (Comment | undefined)[] => {
  return comments.filter(
    (comment) => parseInt(comment.commentId) > parseInt(lastCommentId)
  );
};

const main = async (redis: Redis) => {
  const currentPage = (await redis.getCurrentPage()) ?? 354;
  const lastCommentId = (await redis.getLastCommentId()) ?? "40256659";

  logger.info(`currentPage: ${currentPage}, lastCommentId: ${lastCommentId}`);

  const payload = new Payload(currentPage);
  const generatedValue = await payload.generateParameter();

  const dealabsApi = new DealabsApi(generatedValue);
  try {
    const data = await dealabsApi.getResponse();
    const comments = dealabsApi.getComments(data);

    const lastCommentIdFromResponse = comments[comments.length - 1].commentId;
    const lastPageFromResponse = dealabsApi.getLastPage(data);

    if (lastPageFromResponse !== (await redis.getCurrentPage())) {
      logger.info(`New last page: ${lastPageFromResponse}`);
      await redis.setCurrentPage(lastPageFromResponse);
    }

    if (
      lastCommentId === lastCommentIdFromResponse &&
      currentPage === lastPageFromResponse
    ) {
      logger.info("No new comment");
      return;
    }

    const newComments = getNewComments(comments, lastCommentId);
    logger.info(`New comments: ${newComments.length}`);

    newComments.forEach(async (comment) => {
      if (comment) {
        const telegram = new Telegram();
        await telegram.sendMessage(comment.preparedHtmlContent);
      }
    });

    await redis.setLastCommentId(lastCommentIdFromResponse);

    if (currentPage === lastPageFromResponse) {
      logger.info("No new page");
      return;
    }

    await redis.setCurrentPage(currentPage + 1);
    logger.info(`New page: ${currentPage + 1}`);
    await main(redis);
  } catch (error) {
    logger.error(error);
    return;
  }
};

(async () => {
  const redis = await Redis.create();
  await main(redis);
  await redis.disconnect();
})();
