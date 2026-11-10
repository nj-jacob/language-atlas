/* Grade 7 Media and Online Life: the hand-written part of the printable worksheets (the rest is made from chapters/media.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, A2.1 to A2.7.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('media', { code: 'MD', ideas: {
    footprint: { goal: 'I can think before I post, because posts can last.', think: [
      T('Is a private account fully private? Explain.', '', 'No. Followers can screenshot and share anything you post.'),
      T('Before you post a photo of a friend, what should you do? Why?', '', 'Ask their permission. It is their image and their digital identity too.'),
      T('Name one thing you could post that builds a positive digital identity.', '', 'For example: a project you are proud of, or kind support for a community event.')] },
    security: { goal: 'I can protect my accounts and personal data.', think: [
      T('Why is using the same password everywhere risky?', '', 'If one site leaks it, every account can be opened.'),
      T('A message says you won a prize and asks for your address. What should you do?', '', 'Do not reply or click. Tell a trusted adult; it may be a scam to steal information.'),
      T('Name two ways to make a strong password.', '', 'Make it long, use a phrase of random words, and do not use personal details.')] },
    'mis-dis': { goal: 'I can tell misinformation from disinformation and curated feeds.', think: [
      T('What is the difference between misinformation and disinformation?', '', 'Misinformation is false and shared by mistake. Disinformation is false and shared on purpose to trick.'),
      T('Your feed shows only one side of a story. Why might that be?', '', 'It is curated: an app picks posts based on what you clicked before.'),
      T('Name two checks before you share a surprising post.', '', 'Check the source, look for the same story from other reliable sources, and check the date.')] },
    ethics: { goal: 'I can use other people\'s work legally and fairly.', think: [
      T('Does "no copyright intended" make it legal to use a song in your video? Explain.', '', 'No. You need permission, a licence, or a song that allows reuse.'),
      T('What does a Creative Commons licence let you do?', '', 'Reuse the work in the ways the creator allows, usually with credit.'),
      T('Why give credit even when a work is free to use?', '', 'It is fair to the creator and lets readers find the original.')] },
    techniques: { goal: 'I can explain how a media technique aims at its audience.', think: [
      T('An ad shows famous athletes drinking a sports drink. Who is the audience? What is the technique?', '', 'Young people who like sports. The technique is a celebrity endorsement.'),
      T('Why do techniques work best when you do not notice them?', '', 'You do not stop to question the message, so it changes how you feel without you deciding.'),
      T('Describe one technique you saw in an ad and its effect on you.', '', 'Any named technique (music, colour, celebrity, bandwagon) with a clear effect.')] },
    audience: { goal: 'I can think about intended and unintended audiences.', think: [
      T('You post a joke for your friends. Who else might see it?', '', 'Family, teachers, strangers, future employers: anyone it is shared with.'),
      T('How might a joke that is fine for friends hurt an unintended audience?', '', 'People without the context may find it rude or hurtful.'),
      T('How does the place a message is posted change its meaning?', '', 'The same words read differently in a group chat, a school website or a news site.')] },
    design: { goal: 'I can design, test and propose a solution with digital tools.', think: [
      T('Why test a design with real users before proposing it?', '', 'Users show what does not work, so the solution fits them, not only the designer.'),
      T('Describe a school problem a digital tool could help with. Name the tool.', '', 'For example: a shared online calendar to stop clubs booking the gym at the same time.'),
      T('How can you work respectfully with people from other communities online?', '', 'Listen, use respectful words, learn about their culture, and give credit for their ideas.')] }
  } });
})();
