# 5 things I love about my website (and how they're built)

This website is home to certain tech and web dev goodies that make me very happy. This post is about what they are, and how they work. 

## 1. It follows light/dark mode based on your preference

While most websites these days come with some type of dark/light mode toggle switch, this website serves you content based on the setting that you've set on your system: if you use your phone/computer in dark mode, you get dark mode. If you use it in light mode, you get light mode.

<!-- Picture -->

This is made possible by the powerful [`prefers-color-scheme` media query in CSS](). Here's a code sample that makes that possible.

## 2. It is a dream to develop

This website is built with [React]() and [ZEIT]()'s popular framework [Next.js](), which honestly is such a dream to work with. 😍 Next.js' opinionated-ness as a framework takes a lot of the mental overhead of structuring my website away from me and, in many ways, _"just works"_. What's even better, is it's all magically ✨ server-rendered out-of-the-box, without extra work from me so search engines can pick it up and people can find it!

<!-- Table server render vs. client render -->

### Server Rendering

What is server rendering? It's when a website is _"rendered"_ (think, _drawn_) on the server and then delivered to a browser. This way, you get the content _immediately_ from a _server_. This is a bit different than how many websites work on the web today. If you've ever opened up a website and seen spinners immediately before your content, it's quite likely that that website was _not_ server rendered: it was _"drawn"_ (or _rendered_) in your browser (AKA the client, AKA _not_ a server).

The benefit of server-rendering for me is:
- You get your content immediately, instead of spinners
- Search engines can read it easier
- No jumpy and possibly unpredictable behavior: if you load a non-server-rendered-spinner-driven website on a train, or somewhere with intermittent internet, the user experience could end up in some strange, unpredictable state. This risk doesn't quite exist with server rendering.

Next.js gives me all of this _for free_, without having to do anything.

### Deployment

IT GETS BETTER! Using another product from [ZEIT]() called [`now`](), I'm able to upload this site to the internet _magically_ by running _one_ command. And _just like that_, tejaskumar.com is up-to-date with the latest blog post and can scale infinitely and handle billions of readers at any given time.

<!-- now gif -->

What a time to be alive. 😍

## 3. Whimsy

I've tried to keep this website playful and _whimsical_, with the [silly photos of me]() and [odd nicknames](). I feel like we can all sometimes get too serious. I'd like my little corner of the internet to be fun and not so _langweilig_.

<!-- mac dock gif -->

I even created a mouseover effect to mimic the [Mac OSX dock]() in CSS just for fun because _why not_. Let's make it playful and fun. If you have ideas for ways we can continue to boost the whimsy of this website, [let me know on twitter]() and it could be a cool collaboration between us! 😄

<!-- josh -->

I really appreciate Josh Comeau (check spelling) and [the things he creates]() because they're creative and beautiful. It's this kind of flair/vibe that I appreciate on the web.

## 4. GitHub is my backend

I've had a number of conversations that go like this:

> I'm starting a blog. What stack should I choose? What should my backend be? 🤔

I've had this conversation with myself often. As with most things, I'd like to employ the KISS (Keep It Simple and Spectacular) principle.

I'm a huge fan of the [JAMStack](): the **JavaScript**, **APIs**, **Markup** stack. That's entirely how this website works:

- the interactivity of this page is provided by **JavaScript**,
- via [GitHub's GraphQL **API**](), it retrieves [blog posts contained in this repo]() written in [markdown](), and finally
- renders [markup]() in your browser via Next.js.

There are a number of different backends I could use. I could even go _"backendless"_ and have everything be statically generated using [Gatsby]() or similar. Why do I choose a GitHub backend? I'm glad you asked.

1. **The source code lives on GitHub.** Like... it's _there_. A database is essentially a folder containing files and things in a certain structure. There's no real reason my [blog folder]() couldn't be a database. It seems like the simplest solution. There _are_ limitations, but they don't matter much to me. 

2. **Static build time.** This blog has 3 posts on it at the time of writing. 3. Three. T h r e e. Drei. That's not a lot. But, when building something, I think of scenarios where it could have 3,000,000. In this case, a static site _could theoretically_ take a [looooooong time]() to build, which could be problematic. **This is the reason I have not chosen a static site generator.** I love client/server because it scales better and allows more clearly defined, non-blocking boundaries between actors.

3. **Enforced transferrable writing.** Realistically, GitHub has a rate limit. I think it caps out at 5K requests per hour (please don't [DDoS]() me). At some point, I might have to move my blog post writings out of this GitHub repository and somewhere else. How hard will this migration be?

Copy. Paste.

It's _all text_. Literally, it's [_all markdown_](). Nothing more, nothing less. The images are externally hosted and can be polyfilled, but besides that, it's text. I can copy these files to any other backend that supports, well, _text_, and nobody will be able to tell anything changed. Having GitHub as my API enforces me writing this way (transferably) and I love it!

In case I outgrow the GitHub backend, I'd consider [Fauna]() or similar as a DB. It supports text.

## 5. It is community driven

Did Tejas build this website? Kind of. Tejas built this website with [these wonderful people](). It's a team effort! This website is community driven.

<!-- tweet -->

I also have a list of developers I plan to collaborate with in the near future. This list is composed of people with varying backgrounds (beginners through experts) and usually from [underrepresented groups in tech](). It's an honor and a privilege to use my little corner of the web as a platform to help others in the tech industry as it grows increasingly beautiful each day.

Ah, writing all this reminds me how much I have to be thankful for.

_brb_
