/* Grade 6 Critical Reading: worksheets (assets/engine/sheets.js). Learn, Practise and Activity sheets are made from
   chapters/critical.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, C3.2, C3.3, C3.5, C3.6. Every text is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('critical', { code: 'CT', ideas: {
    stated: { goal: 'I can tell what is stated from what I work out.', think: [
      O('What is stated? What can you work out?', 'Jonah dropped his backpack by the door and went straight to bed without dinner.', 3, 'Stated: he dropped his pack and skipped dinner. Worked out: he is very tired or upset.'),
      O('What can you infer about the season? Which clues?', 'Mittens steamed on the radiator while snow piled against the window.', 2, 'Winter: mittens, radiator, snow.'),
      O('Why do writers leave some things unstated?', null, 2, 'To make readers think and to make the story more interesting.')] },
    theme: { goal: 'I can find the big message of a story.', think: [
      O('A girl who is teased for her accent keeps speaking up in class and finally wins the speech contest. What is the big message?', null, 2, 'Believe in yourself; your voice matters.'),
      O('How is a theme different from a topic?', null, 2, 'A topic is what it is about (friendship). A theme is the lesson about it (true friends help you).'),
      O('Name a story you know and its theme.', null, 3, 'Any story with a lesson stated as a full sentence.')] },
    support: { goal: 'I can find the details that support the main idea.', think: [
      O('Main idea: Wetlands are important. Write two details that support it.', null, 3, 'They clean water. They are homes for many birds and frogs.'),
      O('Which detail does not support the main idea? Why?', 'Main idea: Cycling is good for health. Details: It strengthens the heart. It builds leg muscles. Bikes come in many colours.', 2, 'Bikes come in many colours: it is not about health.'),
      O('Why should writers cut details that do not support the main idea?', null, 2, 'They distract the reader and weaken the point.')] },
    reliable: { goal: 'I can judge if a source is reliable for my purpose.', think: [
      O('For a report on polar bears, which is more reliable: a government wildlife site or a stranger\'s post? Why?', null, 3, 'The wildlife site: experts write it and check facts.'),
      O('List three questions to ask about any source.', null, 3, 'Who made it? When? Is it fact or opinion? Do other sources agree?'),
      O('A site selling vitamins says vitamins cure colds. Why be careful?', null, 2, 'They want to sell vitamins, so they may not be fair.')] },
    perspective: { goal: 'I can tell whose perspective a text shows.', think: [
      O('Whose perspective? What words tell you?', 'The new highway will finally get drivers home faster.', 2, 'A driver\'s: "finally", "get drivers home faster".'),
      O('Retell the highway news from the perspective of a farmer whose field it crosses.', null, 3, 'The new highway will cut my field in half and I will lose crops.'),
      O('How can you avoid bias in your own writing?', null, 2, 'Include more than one perspective and use fair words.')] },
    missing: { goal: 'I can notice whose voice is missing.', think: [
      O('An article about a new dam quotes only the company. Whose voices are missing?', null, 2, 'People who live nearby, First Nations whose lands are affected, and environmental scientists.'),
      O('Why does a missing voice matter?', null, 2, 'Readers get only one side, so they may not see the full picture.'),
      O('Rewrite a headline to include another voice.', 'Company Celebrates New Dam', 2, 'New Dam Opens; Neighbours Worry About Fish')] },
    positions: { goal: 'I can name the different positions on an issue.', think: [
      O('Issue: Should the school have a ramp at every door? Give two positions.', null, 3, 'Yes: everyone can come and go easily. Some say: it costs a lot; start with the main doors.'),
      O('What message about inclusion could a story about a deaf hockey player give?', null, 2, 'Everyone can belong when teams make room for differences.'),
      O('Choose a position on an issue at your school. Give one reason.', null, 3, 'Any position with a supporting reason.')] }
  } });
})();
