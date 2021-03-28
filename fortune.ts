import { OAuth1Info } from "https://kamekyame.github.io/deno_tools/http/mod.ts";

import {
  changeRules,
  getRules,
  StreamTweet,
} from "https://kamekyame.github.io/twitter_api_client/api_v2/tweets/filtered_stream.ts";
import {
  statusUpdate,
} from "https://kamekyame.github.io/twitter_api_client/api_v1/tweets/update.ts";

import { TweetLogFileOp } from "./file.ts";

export class Fortune {
  private readonly auth: OAuth1Info;
  private readonly bearerToken: string;

  private receiveUsername = "SuzuTomo2001";

  private readonly tag = "replyBOT";
  private readonly value = () =>
    `to:${this.receiveUsername} -from:${this.receiveUsername}`;

  constructor(auth: OAuth1Info, bearerToken: string) {
    this.auth = auth;
    this.bearerToken = bearerToken;
  }

  public setReceiveUsername(username: string) {
    this.receiveUsername = username;
  }

  public async checkRule() {
    const rules = await getRules(this.bearerToken);
    if (!rules.data?.some((d) => d.value === this.value())) {
      const aRules = await changeRules(this.bearerToken, {
        add: [{ value: this.value(), tag: this.tag }],
      });
    }
  }

  async callback(res: StreamTweet) {
    if (!res.matching_rules.some((e) => e.tag === this.tag)) return;
    if (res.data.text.indexOf("占い") === -1) return;
    const getUser = () => {
      if (res.includes?.users && res.includes.users.length > 0) {
        return res.includes.users[0];
      }
    };
    const user = getUser();
    if (!user) return;

    let status = `
@${user.username}
運勢とラッキーアイテム

#すずともBot`;

    const tweetRes = await statusUpdate(this.auth, {
      status,
      in_reply_to_status_id: res.data.id,
    });

    console.log(`@${user.username}を占ったよ\ttweetId:${tweetRes.id}`);

    TweetLogFileOp.add(tweetRes);
  }
}
