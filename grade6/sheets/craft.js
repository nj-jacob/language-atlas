/* Grade 6 Text Structure and Style: worksheets (assets/engine/sheets.js). Learn and Practise sheets are made from
   chapters/craft.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, C1.3, C1.4, C1.5, C3.1. Every text is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('craft', { code: 'CR', ideas: {
    patterns: { goal: 'I can name a text pattern and say how it helps.', think: [
      O('Which pattern? How do you know?', 'Plastic is filling the lake. Our town could ban plastic bags and add more recycling bins.', 2, 'Problem and solution: it names a problem, then ways to fix it.'),
      O('Name signal words for cause and effect.', null, 2, 'because, so, as a result, therefore, since'),
      O('Plan a compare and contrast paragraph about two animals. List one same and one different.', null, 3, 'Beavers and muskrats: both live in water; beavers build dams, muskrats do not.')] },
    features: { goal: 'I can explain how text features help readers.', think: [
      O('How does a subheading help a reader?', null, 2, 'It tells what the next part is about, so you can find information fast.'),
      O('On a website, how does a pull-down menu help?', null, 2, 'It hides choices until you need them and groups them so you can find a page.'),
      O('Name two features you would add to a report on wolves. Why?', null, 3, 'A map of where wolves live and a labelled diagram of a wolf.')] },
    visuals: { goal: 'I can choose the visual that fits.', think: [
      O('Which visual shows how a tadpole becomes a frog? Why?', null, 2, 'A cycle diagram: it shows stages in order.'),
      O('Which visual compares rainfall in four cities? Why?', null, 2, 'A bar graph: it shows amounts side by side.'),
      O('How can a photo change how a reader feels about a topic?', null, 3, 'A close-up of a hurt animal can make readers feel sad and want to help.')] },
    design: { goal: 'I can explain how design choices create meaning.', think: [
      O('Why might a poster use big red letters for one word?', null, 2, 'To grab attention and show that word matters most.'),
      O('Why do many science books use white space and few colours?', null, 2, 'It is calm and clear, so readers focus on the information.'),
      O('Compare two book covers you know. Which design works better? Why?', null, 3, 'Any comparison with reasons about colour, font, picture or layout.')] },
    style: { goal: 'I can explain how style creates meaning.', think: [
      O('How does the short sentence change the feeling?', 'The wind howled all night, shaking the windows and rattling the door. Then silence.', 3, 'It is sudden, so the silence feels shocking and tense.'),
      O('Describe the voice of this writer.', 'Honestly? Broccoli is the worst. Nobody can change my mind.', 2, 'Strong, funny, chatty, opinionated.'),
      O('Rewrite to give it a calm voice.', 'The sky EXPLODED with lightning!!', 2, 'Lightning flickered quietly across the sky.')] },
    hyperbole: { goal: 'I can explain what a hyperbole means and why it is used.', think: [
      O('What does it really mean?', 'I have told you a million times.', 2, 'I have told you many times, and I am frustrated.'),
      O('Write a hyperbole about being hungry.', null, 2, 'I am so hungry I could eat a moose.'),
      O('Would hyperbole fit a science report? Why?', null, 2, 'No. Reports need exact facts, not exaggeration.')] },
    idioms: { goal: 'I can explain what an idiom means.', think: [
      O('What does it mean?', 'Learning to skate was a piece of cake for Anya.', 2, 'It was very easy for her.'),
      O('What does it mean?', 'Let\'s not cross that bridge until we come to it.', 2, 'Do not worry about a problem until it happens.'),
      O('Why might idioms confuse someone learning English?', null, 2, 'The words do not mean what they say, so you have to know the saying.')] }
  } });
})();
