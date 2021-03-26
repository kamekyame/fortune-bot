import { OAuth1Info } from "https://kamekyame.github.io/deno_tools/http/mod.ts";

import { getBearerToken } from "https://kamekyame.github.io/twitter_api_client/auth/oauth2.ts";
import {
  changeRules,
  connectStream,
  getRules,
  StreamTweet,
} from "https://kamekyame.github.io/twitter_api_client/api_v2/tweets/filtered_stream.ts";

class Fortune {
  private readonly auth: OAuth1Info;
  private readonly bearerToken: string;

  private tag = "fortuneBOT";
  private value = `to:${receiveUsername} -from:${receiveUsername}`;

  constructor(auth: OAuth1Info, bearerToken: string) {
    this.auth = auth;
    this.bearerToken = bearerToken;
  }

  async checkRule() {
    const rules = await getRules(this.bearerToken);
    if (!rules.data?.some((d) => d.tag === this.tag)) {
      const aRules = await changeRules(bearerToken, { add: [{ value, tag }] });
    }
  }

  callback(res: StreamTweet) {
  }
}
