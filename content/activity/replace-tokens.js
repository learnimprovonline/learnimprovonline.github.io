const replace = require('replace-in-file')
const conventions = require('./conventions')

const from = []
const to = []

conventions.forEach((convention) => {
  const token = new RegExp(`{{ ${convention.name} }}`,"g");
  from.push(token)
  to.push(convention.verbiage)
})

console.log(from)

const options = {
  files: 'content/activity/activities/*.md',
  from: from,
  to: to,
};

const changes = replace.sync(options);

console.log(changes);