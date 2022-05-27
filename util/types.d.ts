import { BaseClientOptions, XataRecord } from '@xata.io/client';
export interface Testimonial {
    handle?: string | null;
    followers?: number | null;
    tweet_url?: string | null;
    ast?: string | null;
}
export declare type TestimonialRecord = Testimonial & XataRecord;
export declare type DatabaseSchema = {
    testimonials: Testimonial;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
    constructor(options?: BaseClientOptions);
}
export {};
