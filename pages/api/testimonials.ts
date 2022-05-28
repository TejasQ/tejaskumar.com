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
        const tweetId = getIdFromTweetUrl(String(t.tweet_url));
        if (t.ast === '""') {
            console.info("No AST for", t.tweet_url, ". Adding...")
            fetchTweetAst(getIdFromTweetUrl(tweetId))
                .then(ast => {
                    if (!ast) {
                        console.info("Couldn't get AST")
                        return;
                    }


                    return client.db.testimonials.update(t.id, {
                        ast: JSON.stringify(ast),
                    }).then(() => { console.info("Added.") });

                })
                .catch((e) => { console.error(e) });
        }
        return ({ id: tweetId, ast: JSON.parse(String(t.ast)) })
    }))))
}

export default handler;
