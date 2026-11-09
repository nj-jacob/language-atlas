/* Grade 4 Media and Online Life: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/media.js; its activities (A2.5, A2.6, A2.7) print as Activity sheets. This file adds goals and Think questions.
   Ontario 2023 Language, Grade 4: A2.1 to A2.7 digital literacy and media. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 2, key: key }; }

  S.register('media', { code: 'MD', ideas: {
    footprint: { goal: 'I can post only what I will be proud of.', think: [
      L('What is a digital footprint?', 'Everything you post or do online, which can stay there.'),
      L('Before you post a photo of a friend, what should you do?', 'Ask their permission.'),
      L('Write one post you would be proud of a year from now.', 'Any kind, safe, respectful post.') ] },
    privacy: { goal: 'I can guard my privacy and well-being online.', think: [
      L('Name two things you should never share online.', 'For example: your address, password, school or phone number.'),
      L('A game asks for your full name and birthday. What do you do?', 'Stop and ask a trusted grown-up first.'),
      L('How can you look after your well-being when you use screens?', 'Take breaks, stop if something upsets you, tell a grown-up.') ] },
    respect: { goal: 'I can be respectful in every online space.', think: [
      L('Someone posts a mean comment about a classmate. What can you do?', 'Do not join in, support the classmate, tell a grown-up, report it.'),
      L('Why is tone hard to tell in a text message?', 'You cannot see a face or hear a voice.'),
      L('Rewrite kindly: "Your drawing is bad."', 'For example: I like your colours. Maybe add more detail to the sky.') ] },
    sources: { goal: 'I can check a source before I trust it.', think: [
      L('Name two questions to ask about a website.', 'Who made it? Is it up to date? Do other sources agree?'),
      L('A post says sharks live in Lake Ontario. How can you check?', 'Look in trusted sources such as a science site or library book.'),
      L('Why should you not trust a fact just because many people shared it?', 'Many shares do not make it true.') ] },
    tricks: { goal: 'I can spot the tricks in ads.', think: [
      L('An ad shows a famous athlete with a cereal. What is the trick?', 'It makes you think the cereal will make you like the athlete.'),
      L('What does "Only today!" try to make you do?', 'Hurry to buy without thinking.'),
      L('Name one more trick ads use.', 'For example: bright colours, catchy music, "everyone has one".') ] },
    message: { goal: 'I can tell who a text is for and why.', think: [
      L('A cartoon ad plays during a kids\' show. Who is it for? Why?', 'Children: it shows when children watch.'),
      L('Name the purpose of a poster for a lost cat.', 'To ask people to look for the cat and call.'),
      L('How would a bike-helmet poster change for teens and for parents?', 'Different pictures and words that matter to each audience.', 3) ] },
    design: { goal: 'I can design to solve a real problem.', think: [
      L('Name a real problem at school you could help solve with a poster or video.', 'For example: litter at recess; a noisy library.'),
      L('Why test your design with real people?', 'To see if it works and how to make it better.'),
      L('List the steps of the design process.', 'Find a problem, plan, make, test, improve.') ] }
  } });
})();
