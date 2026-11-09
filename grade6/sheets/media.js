/* Grade 6 Media and Online Life: worksheets (assets/engine/sheets.js). Learn, Practise and Activity sheets are made from
   chapters/media.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, A2.1 to A2.7. Every text is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('media', { code: 'ME', ideas: {
    privacy: { goal: 'I can protect my personal data.', think: [
      O('A game asks for your home address to give you a prize. What should you do? Why?', null, 2, 'Do not give it. Ask a grown-up; your address is private.'),
      O('List three things you should keep private online.', null, 2, 'full name, address, school, phone number, passwords'),
      O('Why is it hard to delete a photo once it is posted?', null, 2, 'Others can save or share it, so copies can stay online.')] },
    identity: { goal: 'I can explain my digital identity.', think: [
      O('What would you want someone to learn about you from what you post?', null, 2, 'That I am kind, curious and respectful.'),
      O('Why could a rude comment from Grade 6 matter later?', null, 2, 'Posts can last for years, and others may see them.'),
      O('Name one right and one responsibility you have online.', null, 2, 'Right: privacy. Responsibility: be respectful.')] },
    respect: { goal: 'I can be respectful and inclusive online.', think: [
      O('A classmate is left out of a group chat on purpose. What could you do?', null, 2, 'Add them or speak up, and tell a grown-up if it keeps happening.'),
      O('Rewrite to be respectful.', 'ur idea is dumb lol', 2, 'I see it differently. Could we try another idea too?'),
      O('Why should you think before you post?', null, 2, 'Words online can hurt and cannot always be taken back.')] },
    check: { goal: 'I can check information before I share it.', think: [
      O('A post says "Moose spotted in downtown Toronto!" How could you check it?', null, 3, 'Look for a news site, check the date, see if other sources report it.'),
      O('Why do false posts spread fast?', null, 2, 'They are surprising, so people share them without checking.'),
      O('Write two questions to ask before sharing something.', null, 2, 'Who posted it? Can I find it from a trusted source?')] },
    techniques: { goal: 'I can spot techniques that persuade.', think: [
      O('Which technique? "Everyone at school already has one!"', null, 2, 'Bandwagon: join everyone else.'),
      O('Why might an ad for shoes show a famous athlete?', null, 2, 'So people think the shoes will make them like the athlete.'),
      O('Write a fair ad line for a used bike.', null, 2, 'Blue bike, good brakes, a few scratches, $60.')] },
    audience: { goal: 'I can tell how audience and purpose shape a media text.', think: [
      O('Who is the audience for a cereal ad with cartoons? How can you tell?', null, 2, 'Young children: bright colours and cartoons appeal to them.'),
      O('How would an ad for the same cereal change for parents?', null, 2, 'It would talk about health and price.'),
      O('Name a media text you saw this week. What was its purpose?', null, 2, 'Any text with a purpose: inform, persuade or entertain.')] },
    design: { goal: 'I can use the design process to solve a problem.', think: [
      O('Problem: students forget their water bottles. Write a design idea.', null, 2, 'A hook by the door with a picture reminder.'),
      O('Put the steps in order: test it, plan it, find the problem, improve it.', null, 1, 'find the problem, plan it, test it, improve it'),
      O('Why test an idea with real users?', null, 2, 'They show what works and what needs to change.')] }
  } });
})();
