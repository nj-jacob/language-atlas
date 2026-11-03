# One-time setup (Noel)

Language Atlas is published as part of **Atlas**, the one site for Math and Language: https://ontario-math-atlas.web.app/language/.
The math-atlas repository publishes the whole site. Every merge into `main` here runs the checks and, if they pass, asks math-atlas to publish again with these Language pages.

That needs one GitHub key, saved in **both** repositories as a secret named `ATLAS_TOKEN`. The steps are in math-atlas `SETUP.md`, under "Language pages". In short:

1. Make a fine-grained token at https://github.com/settings/personal-access-tokens/new for the repositories **math-atlas** and **language-atlas**, with **Contents: Read and write**.
2. Save it as `ATLAS_TOKEN` at https://github.com/nj-jacob/language-atlas/settings/secrets/actions and at https://github.com/nj-jacob/math-atlas/settings/secrets/actions.

Until then, the checks still run here, but Language changes do not go live.

## Test links before going live (one-time, about 5 minutes)

Every pull request gets its own test link, posted on the pull request by the **Preview** workflow. It shows the whole Atlas site with this pull request's Language pages, and stops working after 7 days. The test link uses the **real** family database, so sign in with a test child, not your child's account.

It needs the Firebase publish key here too, as a secret named `FIREBASE_SERVICE_ACCOUNT`:

1. Open https://console.firebase.google.com/project/ontario-math-atlas/settings/serviceaccounts/adminsdk and click **Generate new private key**. A small file downloads.
2. Open the file in a text editor and copy everything in it.
3. At https://github.com/nj-jacob/language-atlas/settings/secrets/actions click **New repository secret**. Name `FIREBASE_SERVICE_ACCOUNT`, paste, **Add secret**.
4. Delete the downloaded file.

Until then, the checks still run, but pull requests get no test link. To undo a bad publish, see math-atlas `SETUP.md`, "Undo a bad publish".
