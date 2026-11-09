/* Grade 5 Media and Online Life: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/media.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Ontario 2023 Language: A2.1 to A2.5, A2.7. Written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('media', { code: 'ME', ideas: {
    permission: { goal: 'I can ask before I share someone else\'s picture or work.', think: [
      O('You took a funny photo of your friend. What should you do before posting it?', 'Ask your friend (and a grown-up) for permission first.', 2),
      O('What is a digital footprint?', 'Everything you post or do online that leaves a record others can find.', 2),
      O('Why can a post be hard to take back?', 'Others can copy, share or screenshot it before you delete it.', 2)] },
    privacy: { goal: 'I can keep my personal data private.', think: [
      O('List three kinds of personal information you should not share online.', 'For example: home address, phone number, password, school name, birthday.', 2),
      O('A game asks for your full name and address to win a prize. What should you do?', 'Do not enter it. Tell a grown-up; it may be a trick to collect your data.', 2),
      O('What makes a strong password?', 'Long, mixed letters, numbers and symbols, not your name or birthday, kept secret.', 2)] },
    respect: { goal: 'I can be respectful online.', think: [
      O('Someone posts a mean comment about a classmate. What could you do?', 'Do not add to it, support the classmate, and tell a trusted adult or report it.', 2),
      O('Rewrite this comment so it is respectful.', 'For example: I see it differently. I think the other ending fits better.', 2, W.sent('Your idea is dumb and nobody cares.')),
      O('Why can words online hurt more than we expect?', 'There is no tone of voice or face, many people can see them, and they stay.', 2)] },
    check: { goal: 'I can check information before I believe or share it.', think: [
      O('A post says, "Chocolate cures colds!" How could you check it?', 'Look for reliable sources such as a health website, see who wrote it, and check whether experts agree.', 3),
      O('Name two signs that a news story might not be credible.', 'For example: no author, no date, shocking headline, no sources, lots of spelling errors.', 2),
      O('Why should you check before you share?', 'So you do not spread false information to others.', 2)] },
    techniques: { goal: 'I can spot tricks that ads use to persuade.', think: [
      O('Which trick does this ad use?', 'Bandwagon: it says everyone is doing it, so you should too.', 2, W.sent('"Everyone in your class already has the new SnapBand. Don\'t be left out!"')),
      O('Name another ad trick and give an example.', 'For example: a famous person (celebrity endorsement), or "limited time only" to rush you.', 2),
      O('Why is it useful to know these tricks?', 'You can think for yourself and decide if you really need the product.', 2)] },
    audience: { goal: 'I can name the audience and purpose of a media text.', think: [
      O('Who is the audience for a cereal ad with cartoons during Saturday morning shows? What is its purpose?', 'Young children. To make them want the cereal so families buy it.', 2),
      O('How would an ad for the same running shoes change for teenagers and for grandparents?', 'Teens: music, sports stars, style. Grandparents: comfort, support, safety.', 3),
      O('Pick an ad you have seen. Name its audience and purpose.', 'Answers vary: a clear audience and purpose.', 2)] }
  } });
})();
