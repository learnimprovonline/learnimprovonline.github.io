const replace = require('replace-in-file')

const options = {
  files: 'content/activities/*.md',
  from: [
    /\{\{ Circle Up \}\}/g,
    /\{\{ Form Two Lines \}\}/g,
    /\{\{ Switch Lines \}\}/g,
    /\{\{ Rotate Through \}\}/g,
  ],
  to: [
    "Players to stand in a circle with the order randomized using whatever method you prefer.",
    "Players form two lines of equal length. Mix it up so players are not across from someone they've done senes with already.",
    "Players switch lines when he/she has completed a scene. Continue until every player has completed a scene from both lines.",
    "Form a single, randomized line where the first players in line start the first scene. Players rotate through each scene role until every player has performed a scene as each role. Will result in back-to-back scenes except for the first player who rotates out and will be in the last scene. For example, Player 1 starts as Role B and Player 2 starts as Role A. The next scene will be Player 2 as Role A, Player 3 as Role B, and Player 1 at the back of the line.",
  ],
};

const changes = replace.sync(options);

console.log(changes);