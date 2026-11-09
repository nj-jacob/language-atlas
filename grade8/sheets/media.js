/* Grade 8 Media and Digital Literacy: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/media.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: A2.1 to A2.7 digital and media literacy. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('media', { code: 'ME', ideas: {
    identity: { goal: 'I can make choices online that build a positive digital identity.',
      think: [O('Is a deleted post really gone? Explain.', 2, 'Not always: others may have saved, shared or taken a screenshot of it.'),
        O('Name two things you could post that build a positive digital identity.', 2, 'For example: a project you are proud of, kind comments, a volunteer event.'),
        O('Why should you ask permission before posting a photo of a friend?', 2, 'It is their image and their privacy; they have the right to choose.')] },
    scams: { goal: 'I can protect my accounts and personal data.',
      think: [O('A message says "You won a phone! Click to claim." What should you do? Why?', 2, 'Do not click; delete or report it. It is likely a scam to steal data.'),
        O('What makes a strong password?', 2, 'Long, unique for each account, no personal details; a passphrase of random words works well.'),
        O('Name two kinds of personal data you should keep private.', 1, 'Any two of: address, phone number, birthday, passwords, school, location.')] },
    kinds: { goal: 'I can tell misinformation, disinformation and curated information apart.',
      think: [O('What is the difference between misinformation and disinformation?', 2, 'Misinformation is false but shared by mistake; disinformation is false and shared on purpose to mislead.'),
        O('What is curated information? Give an example.', 2, 'Information chosen and arranged for you, such as a news feed or a recommended video list.'),
        O('Why does a video with millions of views not have to be true?', 2, 'Views show popularity, not accuracy.')] },
    check: { goal: 'I can check a claim before I share or use it.',
      think: [O('List three steps to check a surprising claim online.', 3, 'Check who posted it, look for the same claim on reliable sites, check the date, look for the original source.'),
        O('Can you copy any image you find online into your project? Explain.', 2, 'No. It may be copyrighted: check the licence and credit the creator.'),
        O('Why does checking matter before you share?', 2, 'Sharing false claims spreads them and can harm people.')] },
    techniques: { goal: 'I can name the persuasive technique in an ad.',
      think: [O('"9 out of 10 teens choose Zap Drink!" Which technique is this?', 1, 'Bandwagon (and statistics).'),
        O('Name three persuasive techniques and give an example of each.', 3, 'For example: celebrity endorsement, emotional appeal, limited-time offer.'),
        O('Why do techniques work best when we do not notice them?', 2, 'We do not question them, so they shape our choices quietly.')] },
    audience: { goal: 'I can explain the intended and unintended audiences of a text.',
      think: [O('Who is the intended audience of a cereal ad during cartoons? Who else might see it?', 2, 'Children; parents, grandparents and older siblings also see it.'),
        O('How can a private group chat reach an unintended audience?', 2, 'Someone can screenshot it or forward it.'),
        O('How does the purpose of an ad shape its form?', 2, 'For example: a short catchy video to sell, a long article to inform.')] },
    design: { goal: 'I can design a digital solution for real users.',
      think: [O('Why should you understand the problem before choosing a tool?', 2, 'The tool must fit the users and the problem, not the other way round.'),
        O('A senior centre wants members to find events. Suggest a digital solution and one feature for older users.', 3, 'For example: a simple website with large text and a calendar.'),
        O('How could you test whether your design works?', 2, 'Ask real users to try it and give feedback, then improve it.')] },
    respect: { goal: 'I can communicate online in a respectful and inclusive way.',
      think: [O('Rewrite kindly: "That’s the dumbest idea ever."', 1, 'For example: I see it differently; here is why.'),
        O('Why do people sometimes type things they would never say in person?', 2, 'They cannot see the other person’s face and feel distant from them.'),
        O('Name one way to make an online group project inclusive.', 2, 'For example: give everyone a role, invite quiet members, respect different languages and cultures.')] }
  } });
})();
