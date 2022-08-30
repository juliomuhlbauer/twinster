import { Tweetv2FieldsParams } from "twitter-api-v2";

export const tweetParams: Partial<Tweetv2FieldsParams> = {
  expansions: [
    "author_id",
    "attachments.media_keys",
    "referenced_tweets.id",
    "referenced_tweets.id.author_id",
  ],
  "tweet.fields": [
    "attachments",
    "author_id",
    "public_metrics",
    "created_at",
    "id",
    "in_reply_to_user_id",
    "referenced_tweets",
    "text",
  ],
  "user.fields": [
    "id",
    "name",
    "profile_image_url",
    "protected",
    "url",
    "username",
    "verified",
  ],
  "media.fields": [
    "duration_ms",
    "height",
    "media_key",
    "preview_image_url",
    "type",
    "url",
    "width",
    "public_metrics",
  ],
};
