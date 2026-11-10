/* Grade 3 Media and Online Life: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets are made
   from chapters/media.js; this file adds each idea's "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, A2.1 to A2.7. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  S.register('media', { code: 'MD', ideas: {
    private: { goal: 'I can keep private things private.',
      think: [{ q: 'Write three things you should never share online.', lines: 2, key: 'For example: my password, my home address, my phone number (also my school and full name).' },
        { q: 'A game asks for your address. What should you do?', lines: 2, key: 'Do not type it. Tell a trusted grown-up.' },
        { q: 'Why is a password like a toothbrush?', lines: 2, key: 'You keep it to yourself and do not share it with friends.' }] },
    permission: { goal: 'I can ask before I share.',
      think: [{ q: 'You took a funny photo of a friend. What should you do before posting it?', lines: 2, key: 'Ask the friend (and a grown-up) if it is okay to share.' },
        { q: 'Why should we ask before sharing someone’s picture or work?', lines: 2, key: 'It belongs to them, and they may not want others to see it.' },
        { q: 'Write what you could say to ask permission.', lines: 2, key: 'For example: "Is it okay if I share this picture of you?"' }] },
    kind: { goal: 'I can be kind and respectful online.',
      think: [{ q: 'Someone posts a mean comment about a classmate. What can you do?', lines: 2, key: 'Do not join in. Tell a trusted grown-up. Say something kind to the classmate.' },
        { q: 'Write a kind comment you could leave on a friend’s drawing.', lines: 1, key: 'For example: I love the colours you used for the sunset!' },
        { q: 'Why can words online hurt even when you cannot see the person?', lines: 2, key: 'A real person reads them and has feelings.' }] },
    trust: { goal: 'I can check if information can be trusted.',
      think: [{ q: 'A website says, “Moose can fly.” How can you check?', lines: 2, key: 'Look in other sources, like a library book or a trusted website, and ask a grown-up.' },
        { q: 'Write two questions to ask about a website.', lines: 2, key: 'For example: Who made it? Do other sources say the same thing?' },
        { q: 'Why should you check facts in more than one place?', lines: 2, key: 'Some information online is wrong or made up.' }] },
    forms: { goal: 'I can name kinds of media and what they do.',
      think: [{ q: 'Name three kinds of media you see in a week.', lines: 2, key: 'For example: a TV show, a poster, a video game, a website, a podcast.' },
        { q: 'How is a poster different from a video?', lines: 2, key: 'A poster is still, with pictures and a few words; a video moves and has sound.' },
        { q: 'Plan a poster for a school event. Write its title and one picture you would add.', lines: 3, key: 'Any title, with a picture that fits the event.' }] },
    ads: { goal: 'I can tell who made an ad and who it is for.',
      think: [{ q: 'Think of an ad for a toy. Who is it for? How do you know?', lines: 2, key: 'Children: bright colours, kids playing, fun music.' },
        { q: 'What does an ad want you to do?', lines: 1, key: 'Buy something or do something.' },
        { q: 'Write one trick an ad might use to make you want something.', lines: 2, key: 'For example: saying "everyone has one", using a famous person, or showing only the best parts.' }] },
    design: { goal: 'I can plan, make, test and improve a design.',
      think: [{ q: 'Write the four steps of the design process in order.', lines: 2, key: 'Plan, make, test, improve.' },
        { q: 'Your paper boat sinks when you test it. What could you do next?', lines: 2, key: 'Improve it: change the shape or material, then test again.' },
        { q: 'Why do designers test their work?', lines: 2, key: 'To find out what works and what to improve.' }] }
  } });
})();
