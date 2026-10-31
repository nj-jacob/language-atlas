# One-time setup (Noel)

Language Atlas is published as part of **Atlas**, the one site for Math and Language: https://ontario-math-atlas.web.app/language/.
The math-atlas repository publishes the whole site. Every merge into `main` here runs the checks and, if they pass, asks math-atlas to publish again with these Language pages.

That needs one GitHub key, saved in **both** repositories as a secret named `ATLAS_TOKEN`. The steps are in math-atlas `SETUP.md`, under "Language pages". In short:

1. Make a fine-grained token at https://github.com/settings/personal-access-tokens/new for the repositories **math-atlas** and **language-atlas**, with **Contents: Read and write**.
2. Save it as `ATLAS_TOKEN` at https://github.com/nj-jacob/language-atlas/settings/secrets/actions and at https://github.com/nj-jacob/math-atlas/settings/secrets/actions.

Until then, the checks still run here, but Language changes do not go live.
