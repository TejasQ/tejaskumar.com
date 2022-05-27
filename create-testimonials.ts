
import { differenceInMilliseconds } from "date-fns";
import fetch from "isomorphic-fetch";
import dotenv from "dotenv";

import { testimonials } from "./util/talks";
import { XataClient } from "./util/xata";

dotenv.config();

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const client = new XataClient({});

const main = async () => {
    const testimonialsFromXata = await client.db.testimonials.getAll();
    const users = testimonials.map(t => t.split('/')[3]);
    let howManyMoreCanIDo = 300;
    let rateLimitResetTime = '';

    const fetchFromTwitter = (handle: string) => fetch('https://api.twitter.com/1.1/users/lookup.json?screen_name=' + handle, {
        headers: {
            Authorization: "Bearer " + process.env.TWITTER_API_TOKEN
        },
    }).then(r => {
        howManyMoreCanIDo = parseFloat(r.headers.get('x-rate-limit-remaining')!);
        rateLimitResetTime = r.headers.get('x-rate-limit-reset')!;
        return r.json()
    })

    for (const userIndex in users) {
        if (howManyMoreCanIDo <= 1) {
            const howLongToWait = rateLimitResetTime ? differenceInMilliseconds(parseFloat(rateLimitResetTime) * 1000, new Date()) : 900001;
            console.info(`We're about to be rate limited. Waiting ${howLongToWait / 1000} seconds...`);
            console.info("Users so far", testimonialsFromXata.length, 'of', users.length);
            await wait(howLongToWait);
            howManyMoreCanIDo = 900;
        }

        if (!testimonialsFromXata.find(t => t.tweet_url === testimonials[userIndex])) {
            console.log(`Couldn't find ${users[userIndex]}. Fetching from Twitter...`);
            console.info(`We can do ${howManyMoreCanIDo} more requests at this time.`);
            await fetchFromTwitter(users[userIndex]).then(async (u) => {
                if (u.errors) {
                    return;
                }

                await client.db.testimonials.create({ handle: u[0].screen_name, followers: u[0].followers_count, tweet_url: testimonials[userIndex] });
            })
        } else if (process.env.FORCE_REFRESH) {
            console.log(`Forced refresh of ${users[userIndex]}. Fetching from Twitter...`);
            await fetchFromTwitter(users[userIndex]).then(async (u) => {
                if (u.errors) {
                    return;
                }

                return client.db.testimonials.filter({ tweet_url: testimonials[userIndex] }).getOne().then(d => client.db.testimonials.update(d?.id ?? '', { followers: u[0].followers_count }));
            }).then(() => console.log(`Updated ${users[userIndex]}.`))
        }

    }
}

main();
