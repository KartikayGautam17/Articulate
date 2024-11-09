This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

**DEVELOPER_NOTES**
Hi everyone who is visiting this repo, there are some things that I realised while developing this social media sort of clone
by myself which could have made this application much optimised and better in general.

I am noting those things down below so that I can keep some stuff in mind while developing something like this again :)

1. Using context in layout of post and comments instead of prop drilling.

2. Having the array and its setter function available throughout the context so that there is no need for a page refresh to see
   the changes on UI when creating/deleting an object.

3. I have used some props with type 'any' in the application. These are often done on props which are drilled from the parent
   component and the entire issue could have been avoided if I would have used some context and layout.
   The entire function of these props was to trigger a re render a child component instead of the entire parent.

4. I am not sure if creating a lot of states is generally a good idea. Since I have been developing this entire thing without having
   a look at any tutorials, I am not sure what would have been the best approach.

5. Developing a CRUD app does take a lot of motivation, especially when you are doing this without any reference or tutorial, but
   I have been liking what has been turning out by now. (This give good confidence to apply the concepts learnded previously from the tutorials as well)

6. Instead of having numerous amount of api calls, it could have been better to have minimal amount of apis to fetch the data and maintain it throughout the user's session on the server. Maybe or maybe not this is a better approach I am not sure, but it is worth a try (in my future projects for sure).

7. Maybe I should have used Redux as well, would have been a new thing to learn as well it might've been required given that there
   are plenty amount of state handling happening in this project.

8. I've learned a lot by developing this application by myself, what to do and what not to. Hopefully I will be building something of
   greater value now :)
