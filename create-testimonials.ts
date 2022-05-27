
import { differenceInMilliseconds } from "date-fns";
import { writeFileSync } from "fs";
import fetch from "isomorphic-fetch";
import { tmpdir } from "os";
import { join } from "path";
import uniqBy from "lodash/uniqBy"


import { testimonials } from "./util/talks";

const main = async () => {
    const users = testimonials.map(t => t.split('/')[3]);
    const people: any = []
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    let howManyMoreCanIDo = 300;
    let rateLimitResetTime = '';

    for (const userIndex in users) {
        console.info(`We can do ${howManyMoreCanIDo} more requests at this time.`);

        if (howManyMoreCanIDo <= 1) {
            const howLongToWait = rateLimitResetTime ? differenceInMilliseconds(parseFloat(rateLimitResetTime) * 1000, new Date()) : 900001;
            console.info(`We're about to be rate limited. Waiting ${howLongToWait / 1000} seconds...`);
            console.info("Users so far", people.length, 'of', users.length);
            await wait(howLongToWait);
            howManyMoreCanIDo = 900;
        }

        console.info(`Fetching user ${users[userIndex]}`);
        await fetch('https://api.twitter.com/1.1/users/lookup.json?screen_name=' + users[userIndex], {
            headers: {
                Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAGwR%2FQAAAAAAFPXhP47I33hLyzFXebSpZ0JHdjM%3D2kEVckt76keXYqNQG2R97qoPBRiwtWX1jcO1huKVnTysfw6zuh"
            },
        }).then(r => {
            howManyMoreCanIDo = parseFloat(r.headers.get('x-rate-limit-remaining')!);
            rateLimitResetTime = r.headers.get('x-rate-limit-reset')!;
            return r.json()
        }).then((u) => {
            if (u.errors) {
                return;
            }

            people.push({ handle: u[0].screen_name, followers: u[0].followers_count, tweet: testimonials[userIndex] })
        })

    }

    const destination = join(tmpdir(), 'twitter-people.json');
    writeFileSync(destination, JSON.stringify(uniqBy(people.sort((a: any, b: any) => b.followers - a.followers), 'handle')));
    console.info("List available at", destination)
}

main();
