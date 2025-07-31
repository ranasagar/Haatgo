# Deploying Your HaatGo App to Vercel

This guide will walk you through the process of deploying your Next.js application to Vercel using GitHub. Vercel is a platform from the creators of Next.js that is optimized for deploying Next.js apps.

## Step 1: Push Your Project to GitHub

First, you need to get your project code into a GitHub repository.

1.  **Create a GitHub Account**: If you don't have one, sign up at [https://github.com](https://github.com).

2.  **Create a New Repository**:
    *   On your GitHub dashboard, click the "+" icon in the top right and select "New repository".
    *   Give your repository a name (e.g., `haatgo-marketplace`).
    *   You can choose to make it public or private.
    *   Click "Create repository".

3.  **Push Your Code**:
    *   On your local machine, navigate to your project directory in a terminal.
    *   Initialize Git, add your files, and push them to the repository you just created. Follow the instructions under "...or push an existing repository from the command line" on your new GitHub repo page. The commands will look like this:
        ```bash
        # Make sure you are in your project's root directory
        git init -b main
        git add .
        git commit -m "Initial commit"
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
        git push -u origin main
        ```
    *   Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name.

## Step 2: Deploy to Vercel

Now that your code is on GitHub, you can deploy it with Vercel.

1.  **Create a Vercel Account**: If you don't have one, sign up at [https://vercel.com](https://vercel.com) using your GitHub account. This is the easiest way to connect them.

2.  **Import Your Project**:
    *   From your Vercel dashboard, click "Add New..." and select "Project".
    *   The "Import Git Repository" screen will appear. Find the GitHub repository you just created and click "Import".
    *   If you don't see your repository, you may need to configure the Vercel GitHub App to give it access. Follow the on-screen prompts.

3.  **Configure Your Project**:
    *   Vercel will automatically detect that you are using Next.js and pre-fill the build settings. You typically do not need to change these.
    *   The most important step is to add your **Environment Variables**.

4.  **Add Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   You need to add all the variables from your local `.env` file. These are your Firebase credentials.
    *   For each variable (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`), add the name and the corresponding value.
    *   **Crucially, you must also add your `NEXT_PUBLIC_ADMIN_EMAIL` variable here.** This is how the live application will identify the administrator.
    *   The variables you need to add are:
        *   `NEXT_PUBLIC_FIREBASE_API_KEY`
        *   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
        *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
        *   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
        *   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
        *   `NEXT_PUBLIC_FIREBASE_APP_ID`
        *   `NEXT_PUBLIC_ADMIN_EMAIL`

5.  **Deploy**:
    *   Click the "Deploy" button.
    *   Vercel will now build and deploy your application. You'll see a "Congratulations!" screen when it's done.

## Step 3: All Done!

Your application is now live! Vercel will provide you with a URL to view it. Any future pushes you make to your `main` branch on GitHub will automatically trigger a new deployment on Vercel.
