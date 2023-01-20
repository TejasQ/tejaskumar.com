import { NextApiHandler } from "next";
import dotenv from "dotenv";

import { XataClient } from "../../util/xata";

dotenv.config();
const client = new XataClient();

const handler: NextApiHandler = async (req, res) => {
    const { email } = req.body;
    await client.db.church_invites.create({ email })
    res.end();
}

export default handler;
