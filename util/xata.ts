import { buildClient, BaseClientOptions, XataRecord } from "@xata.io/client";

export interface Testimonial {
  handle?: string | null;
  followers?: number | null;
  tweet_url?: string | null;
}

export type TestimonialRecord = Testimonial & XataRecord;

export type DatabaseSchema = {
  testimonials: Testimonial;
};

const links = { testimonials: [] };

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super(
      {
        databaseURL: "https://tejas-o860q2.xata.sh/db/tejaskumar-com",
        ...options,
      },
      links
    );
  }
}
