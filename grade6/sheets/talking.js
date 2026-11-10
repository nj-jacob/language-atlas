/* Grade 6 Listening and Speaking: worksheets (assets/engine/sheets.js). Learn and Practise sheets are made from
   chapters/talking.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, B1.1 to B1.5. Every line is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('talking', { code: 'TA', ideas: {
    'build-on': { goal: 'I can build on what others say in a discussion.', think: [
      O('Priya says: "Our town needs a bike lane." Write a reply that builds on her idea.', null, 2, 'I agree, and it should go past the school so students can ride safely.'),
      O('Write a respectful reply that disagrees with Priya.', null, 2, 'I see your point, but I think a bus route would help more people.'),
      O('When is a good time to ask a question in a group discussion?', null, 2, 'When the speaker has finished a point, or when you do not understand something important.')] },
    clarify: { goal: 'I can ask to check that I understood.', think: [
      O('Write a question to check you understood: "Meet at the usual place after the thing."', null, 2, 'Do you mean the library, after the assembly?'),
      O('Restate the instruction in your own words.', 'Bring two clean jars, but not the glass ones from the kitchen.', 2, 'So I should bring two clean jars that are not glass, right?'),
      O('Why is it better to ask than to guess?', null, 2, 'Guessing can lead to mistakes; asking makes sure you have the right idea.')] },
    'listen-plan': { goal: 'I can listen with a plan: before, during and after.', think: [
      O('Before a talk about bears, what could you do to get ready to listen?', null, 2, 'Think about what I know and write a question I hope it answers.'),
      O('During a talk, what are two things you can do to remember it?', null, 2, 'Jot key words; picture what is said; notice the speaker\'s main points.'),
      O('After listening, how can you check what you learned?', null, 2, 'Sum up the main idea, and ask a question about anything unclear.')] },
    formal: { goal: 'I can choose formal or informal speech.', think: [
      O('Rewrite in formal speech for the principal.', 'Hey, can we get way more recess? It\'d be awesome.', 2, 'Good morning. Could we please have a longer recess? It would help us focus.'),
      O('Formal or informal? Why? Telling a friend about your weekend.', null, 2, 'Informal: it is a friend and a relaxed setting.'),
      O('Name a time you would speak formally. Why?', null, 2, 'Giving a speech at an assembly: the audience and purpose are serious.')] },
    body: { goal: 'I can use body language to support what I say.', think: [
      O('What might crossed arms and a frown tell a listener?', null, 2, 'That you are upset, closed off or do not agree.'),
      O('Name two ways to use your body to show you are listening.', null, 2, 'Face the speaker, nod, keep a calm look.'),
      O('Why might eye contact mean different things in different cultures?', null, 3, 'In some cultures direct eye contact is respectful; in others, looking down shows respect to Elders.')] },
    precise: { goal: 'I can choose precise words that help the listener.', think: [
      O('Make it precise.', 'The thing was really big and went fast.', 2, 'The freight train was enormous and thundered past.'),
      O('Add an adjective and an adverb to make the picture clearer.', 'The dog barked.', 2, 'The small dog barked loudly.'),
      O('Why do precise words help a listener more than a reader?', null, 3, 'A listener cannot reread, so exact words help them picture it the first time.')] }
  } });
})();
