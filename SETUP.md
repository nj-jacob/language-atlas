# One-time setup (Noel)

Language Atlas is published as a **second site inside the Math Atlas Firebase project** (`ontario-math-atlas`). That keeps it on the free plan and lets both sites share one family sign-in later. Publishing only ever touches the Language Atlas pages: never Math Atlas or its saved data.

Two steps, about 10 minutes. Until they are done, the checks still run, but nothing is published and no preview links are posted.

## 1. Add the site in Firebase
1. Open https://console.firebase.google.com and choose the **ontario-math-atlas** project.
2. Go to **Hosting** (under Build), scroll down, and choose **Add another site**.
3. Type the site name `ontario-language-atlas` and press **Add site**.
   - If that name is taken, pick another and tell Claude, so `firebase.json` can be changed to match.
4. The site will live at https://ontario-language-atlas.web.app.

## 2. Give GitHub the key to publish
Use the same key that Math Atlas uses.
1. If you still have the JSON key file from setting up Math Atlas, use it. If not: Firebase console > gear icon > **Project settings** > **Service accounts** > **Generate new private key**. A file downloads. Keep it private.
2. Open https://github.com/nj-jacob/language-atlas/settings/secrets/actions and press **New repository secret**.
3. Name: `FIREBASE_SERVICE_ACCOUNT`. Value: open the key file in a text editor, copy everything, and paste it. Press **Add secret**.

After this:
- every pull request gets a private preview link (it works for 7 days), posted on the pull request once the checks pass;
- every merge into `main` publishes the live site, but only if the checks pass.

## Later: family sign-in
When family accounts are added, `ontario-language-atlas.web.app` will need to be added to **Authentication > Settings > Authorized domains** in the same project. Claude will ask when it is time.
