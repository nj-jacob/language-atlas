/* Grade 2 Media and Online Life: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/media.js.
   Ontario 2023 Language: A2.1 rights and permission, A2.2 safety and privacy, A2.3 information, A2.4 forms,
   A2.5 message and audience, A2.6 design, A2.7 respectful communication. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('media', { code: 'MD', ideas: {
    private: { goal: 'I can keep private things private.', think: [
      O('Write three things you should never share online.', 'For example: my address, my password, my school.', 2),
      O('Someone you do not know asks for your name in a game. What do you do?', 'Do not answer, and tell a grown-up.'),
      O('Why is a friendly stranger online still a stranger?', 'You do not know who they really are.')] },
    'ask-first': { goal: 'I can ask before I use or share something.', think: [
      O('You want to post a photo of your friend. What do you do first?', 'Ask my friend and a grown-up.', 2),
      O('Why should you ask before you use someone’s drawing?', 'It belongs to them. They get to decide.'),
      O('When should you ask a grown-up before you go online?', 'Before a new app, game or website, or before buying.')] },
    kind: { goal: 'I can be kind online.', think: [
      O('Write a kind comment you could leave on a friend’s drawing.', 'For example: I love the colours you used!', 2),
      O('Someone writes mean things to a classmate. What should you do?', 'Do not join in. Tell a grown-up.'),
      O('Why can words online hurt as much as words said out loud?', 'A real person reads them and has feelings.')] },
    trust: { goal: 'I can ask if I can trust what I read online.', think: [
      O('Write two questions to ask before you trust a website.', 'For example: Who made it? Can I check it in another place?'),
      O('A post says, “Cats can fly!” How could you check?', 'Look in a book or ask a grown-up or an expert.'),
      O('Is something true because it is online? Why?', 'No. Anyone can post things that are not true.')] },
    forms: { goal: 'I can name kinds of media.', think: [
      O('Name three kinds of media you saw this week.', 'For example: a TV show, a poster, a video.', 2),
      O('How is a poster different from a video?', 'A poster is still pictures and words. A video moves and has sound.'),
      O('Where do you see ads during a day?', 'For example: on TV, on a bus, in a game.')] },
    ads: { goal: 'I can tell what an ad wants me to do.', think: [
      O('What does an ad for a cereal want you to do?', 'Buy the cereal.', 2),
      O('Why do ads use bright colours, music and happy people?', 'To catch your eye and make you want the thing.'),
      O('An ad says a toy is “the best ever”. Should you believe it? Why?', 'Not always. The ad wants you to buy it.')] },
    design: { goal: 'I can plan, make, test and improve.', think: [
      O('Write the four steps of design in order.', 'Plan, make, test, improve.', 2),
      O('Your paper boat sinks. What could you do next?', 'Test what went wrong, change the design, and try again.'),
      O('Why is testing important?', 'It shows what to fix.')] }
  } });
})();
