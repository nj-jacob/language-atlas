/* Grade 4 How Texts Work: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/craft.js; this file adds each idea's goal and Think questions.
   Ontario 2023 Language, Grade 4: C1.3 text features, C1.4 visuals, C1.5 voice and style, C3.1 literary devices. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 2, key: key }; }

  S.register('craft', { code: 'CR', ideas: {
    type: { goal: 'I can tell why words are in bold or italics, or are links.', think: [
      L('Why is a word in bold in an information book?', 'It is an important word, often in the glossary.'),
      L('What happens when you tap a link? Why do texts use them?', 'It opens more information on another page.'),
      L('Write a sentence where one word should be in italics. Underline it.', 'For example: I was so tired.') ] },
    spatial: { goal: 'I can read a diagram in order.', think: [
      L('How do arrows help you read a life-cycle diagram?', 'They show the order: which stage comes next.'),
      L('Why are labels on a diagram short?', 'They name the part; the picture shows the rest.'),
      L('Draw a 3-step diagram of making toast, with arrows.', 'Three labelled steps with arrows in order.', 4) ] },
    graphs: { goal: 'I can explain how pictures and graphs add meaning.', think: [
      L('Why might a writer add a graph to a text about rainfall?', 'It shows the amounts at a glance and lets you compare.'),
      L('What does a caption do?', 'It tells what the picture shows.'),
      L('What would you learn from a map of a canoe route that words alone miss?', 'Where places are, distance and direction.') ] },
    voice: { goal: 'I can describe the voice of a text.', think: [
      L('"Whoa! You will NOT believe what we found!" Describe the voice.', 'Excited, chatty, talking right to the reader.'),
      L('How would a science report sound different?', 'Calm, clear and factual.'),
      L('Write one sentence about rain in a gloomy voice.', 'For example: The grey rain dripped on and on.') ] },
    sentences: { goal: 'I can explain how short sentences build suspense.', think: [
      L('Why would a writer use short sentences in a scary part?', 'They are quick and sharp, like a fast heartbeat.'),
      L('Write three short sentences for a tense moment.', 'For example: A twig snapped. I froze. Silence.'),
      L('Where might long sentences fit better?', 'In calm parts, to describe a scene slowly.') ] },
    personification: { goal: 'I can find and explain personification.', think: [
      L('"The wind howled at the windows." What human thing does the wind do?', 'It howls, like a person or animal crying out.'),
      L('Write a sentence where the sun does something a person does.', 'For example: The sun smiled on the fields.'),
      L('Why do writers use personification?', 'To help you picture and feel the thing.') ] },
    anthropomorphism: { goal: 'I can tell when animals act like people.', think: [
      L('Name a story where an animal talks or wears clothes. What makes it like a person?', 'Any example with a human action.'),
      L('How is this different from personification?', 'Personification gives one human action; here the animal acts like a whole person.'),
      L('Why might a teaching story use animals that act like people?', 'Readers enjoy it and can learn a lesson from the animal.') ] }
  } });
})();
