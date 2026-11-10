/* Grade 7 Thinking Critically: the hand-written part of the printable worksheets (the rest is made from chapters/thinking.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, C3.1 to C3.6.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('thinking', { code: 'TH', ideas: {
    foreshadow: { goal: 'I can spot foreshadowing and say what it hints at.', think: [
      T('What might this hint at?', 'Grandpa frowned at the dark clouds and pulled the canoe higher up the beach.', 'A storm is coming, and the water may rise.'),
      T('Is every early detail foreshadowing? Explain.', '', 'No. It must point to something that really happens later in the story.'),
      T('Why do writers use foreshadowing?', '', 'It builds suspense and makes the ending feel planned, not random.')] },
    symbol: { goal: 'I can explain what a symbol stands for.', think: [
      T('In a story, a girl keeps her late grandmother\'s beaded bracelet and touches it whenever she is scared. What might it stand for?', '', 'Her grandmother\'s love and courage, or her family and culture.'),
      T('How can you tell an object is a symbol and not just an object?', '', 'It is repeated and tied to a character\'s feelings or the big idea.'),
      T('Choose an object that could stand for hope in a story. Explain.', '', 'For example: a seed that sprouts after a hard winter, because it shows new life.')] },
    allegory: { goal: 'I can explain the lesson an allegory teaches.', think: [
      T('Two villages build a wall on the river and both run out of water. What might the whole story teach?', '', 'That refusing to share hurts everyone, or that we depend on each other.'),
      T('Why is "it is about a wall" not enough?', '', 'That is the surface. An allegory uses the whole story to teach a bigger idea.'),
      T('Why might a writer teach through an allegory instead of saying the lesson?', '', 'A story is easier to remember and lets readers discover the lesson for themselves.')] },
    local: { goal: 'I can infer from a small clue.', think: [
      T('What can you infer? Which words tell you?', 'Ari\'s hands shook as he handed the coach his tryout form.', 'Ari is nervous. "hands shook" is the clue.'),
      T('What is wrong with an inference that has no clue behind it?', '', 'It is a guess. An inference must be backed by words in the text.'),
      T('Write a sentence that lets a reader infer someone is excited, without saying "excited".', '', 'For example: "Lena bounced on her toes and checked the door every few seconds."')] },
    global: { goal: 'I can infer the message of the whole text.', think: [
      T('How is a theme different from the plot?', '', 'The plot is what happens. The theme is a message that is true outside the story too.'),
      T('A story ends with a boy giving up first place to help a hurt runner. What might the theme be?', '', 'For example: kindness matters more than winning.'),
      T('Name a story you know and its theme. Give one piece of evidence.', '', 'Any text with a message and a supporting event.')] },
    synthesize: { goal: 'I can put sources together to reach a new idea.', think: [
      T('Put these together. What new conclusion can you reach?', 'Source A: Ice roads melt earlier each year. · Source B: Northern towns get supplies by ice road.', 'Northern towns may have a harder time getting supplies as winters warm.'),
      T('How is synthesizing different from summarizing two sources?', '', 'A summary retells each. A synthesis joins them to make a new idea.'),
      T('Why read more than one source on a topic?', '', 'Each source may miss something. Together they give a fuller, fairer picture.')] },
    position: { goal: 'I can find a position and the other side.', think: [
      T('State the position, then give one point the other side might make.', 'Our school should start an hour later.', 'Position: start later. Other side: buses and after-school jobs would be harder to arrange.'),
      T('Why understand both positions before you agree or disagree?', '', 'You can judge fairly and give a stronger answer.'),
      T('How might a text about accessibility show different positions?', '', 'It could quote people who want changes now and people worried about cost, and explain why each thinks so.')] },
    bias: { goal: 'I can spot loaded words that reveal bias.', think: [
      T('Which words show bias? Rewrite it fairly.', 'Greedy developers want to destroy our beautiful park.', '"Greedy" and "destroy". Fair: "Developers plan to build on part of the park."'),
      T('Can a news report be biased even with no opinions? Explain.', '', 'Yes. It can leave out facts or voices, or choose loaded words.'),
      T('How can you avoid bias when you write about a topic?', '', 'Use neutral words, include more than one view, and check facts.')] }
  } });
})();
