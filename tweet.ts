/*const receiveUsername = "SuzuTomo2001";

const bearerToken = await getBearerToken(auth.consumerKey, auth.consumerSecret);

const tag = "fortuneBOT";
const value = `to:${receiveUsername} -from:${receiveUsername}`;

// streamのルールをチェック。じゃんけんBOT用のルールが無かったら追加
async function checkRule() {
  const rules = await getRules(bearerToken);
  if (!rules.data?.some((d) => d.tag === tag)) {
    const aRules = await changeRules(bearerToken, { add: [{ value, tag }] });
  }
}
*/