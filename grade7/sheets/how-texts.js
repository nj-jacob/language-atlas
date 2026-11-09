/* Grade 7 How Texts Work: the hand-written part of the printable worksheets (the rest is made from chapters/how-texts.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, C1.2 to C1.6.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('how-texts', { code: 'HT', ideas: {
    forms: { goal: 'I can name a text form from its features.', think: [
      T('Why is "it is about ice" not an answer to "What form is this text?"', '', 'That is the topic. The form is the kind of text: a report, a poem, a letter, a news story.'),
      T('Name two features of a news article and say how they help the reader.', '', 'A headline grabs attention and gives the main point; the first paragraph answers who, what, when, where.'),
      T('Why might a writer tell a teaching as a story instead of a report?', '', 'A story makes the reader feel and remember the teaching.')] },
    patterns: { goal: 'I can use signal words to find the text pattern.', think: [
      T('What pattern do these signal words show?', 'because · as a result · therefore', 'Cause and effect.'),
      T('Why does "but" alone not prove that a text is a comparison?', '', 'One "but" can show a small contrast. Look for the main signal words across the whole text.'),
      T('How does knowing the pattern help you take notes?', '', 'You can use the right organizer: a T-chart for compare, a chain for cause and effect, a timeline for sequence.')] },
    features: { goal: 'I can use text features to find and understand.', think: [
      T('Why should you read captions and sidebars?', '', 'They often hold the most useful facts or explain a picture.'),
      T('What is a bibliography for?', '', 'It lists the sources the writer used, so readers can check them.'),
      T('How do accessible fonts and clear headings help readers?', '', 'They make text easier to read for everyone, including people with low vision or dyslexia.')] },
    graphics: { goal: 'I can choose the graphic that fits the information.', think: [
      T('Which graphic fits each? Explain one.', 'how a town grew over 50 years · parts of a canoe', 'A line graph or timeline for growth; a labelled diagram for parts.'),
      T('Why might the graphic carry the main point of a page?', '', 'A picture can show a pattern or comparison faster than many sentences.'),
      T('What could make a graph misleading?', '', 'A scale that does not start at zero, missing labels, or cherry-picked data.')] },
    design: { goal: 'I can explain how design guides the eye.', think: [
      T('On a poster, what does a huge headline tell the reader?', '', 'That it is the most important message, and where to look first.'),
      T('Is design only decoration? Explain.', '', 'No. Size, colour and space show what matters most and the order to read things.'),
      T('Describe how you would design a poster for a lost dog so people notice it.', '', 'A large photo, a big short headline, a phone number in bold, and plenty of white space.')] },
    style: { goal: 'I can explain how style shapes how a text feels.', think: [
      T('What feeling do these short sentences create?', 'The ice cracked. Nobody moved. Then it split.', 'Tension and suspense: short sentences speed up and build fear.'),
      T('Name a style choice and its effect on the reader.', '', 'For example: repetition of "we will" makes a speech sound strong and determined.'),
      T('Rewrite to sound calm and peaceful.', 'The wind roared and the waves smashed the dock.', 'For example: "A soft wind drifted over the lake, and small waves lapped the dock."')] },
    narrator: { goal: 'I can name the narrator\'s point of view.', think: [
      T('Which point of view is this? How do you know?', 'You step onto the ice. You feel it shift under your boots.', 'Second person: the narrator speaks to "you".'),
      T('A story uses "I" inside speech marks. Does that make it first person? Explain.', '', 'Not always. Only the narrator\'s own words count, not what characters say.'),
      T('How would a story change if it were told by a different character? Give an example.', '', 'We would learn different thoughts and feelings, and see events from another side, e.g. the rival in a race story.')] }
  } });
})();
