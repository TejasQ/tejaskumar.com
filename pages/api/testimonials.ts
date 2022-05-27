import { NextApiHandler } from "next";
import dotenv from "dotenv";
import { fetchTweetAst } from "static-tweets";

import { getIdFromTweetUrl } from "../../util/getIdFromTweetUrl";
import { XataClient } from "../../util/xata";
import { randomizeArray } from "../../util/randomizeArray";

dotenv.config();
const client = new XataClient();

const handler: NextApiHandler = async (req, res) => {
    const from = req.query.from;

    const testimonials = await client.db.testimonials
        .sort("followers", "desc")
        .getMany({ page: { size: 25, offset: parseFloat(String(from)) } });

    res.end(JSON.stringify(randomizeArray(testimonials.map(t => {
        if (!t.ast) {
            fetchTweetAst(getIdFromTweetUrl(t.id))
                .then(ast => {
                    if (!ast) return;
                    client.db.testimonials
                        .filter({ tweet_url: t.tweet_url })
                        .getOne()
                        .then(result =>
                            client.db.testimonials.update(result!.id, {
                                ast: JSON.stringify(ast),
                            })
                        );
                })
                .catch(() => { });
        }
        return ({ id: getIdFromTweetUrl(String(t.tweet_url)), ast: JSON.parse(String(t.ast)) })
    }))))
}

export default handler;