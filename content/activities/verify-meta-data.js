const yaml = require('js-yaml');
const fs = require('fs');
const yup = require('yup');
const foci = require('../../src/data/focus/foci.json');
const durationTypes = require('./durationTypes.json');

const focusNames = foci.map(focus => focus.name);
const durationTypeNames = durationTypes.map(durationType => durationType.name);
const activityTypes = ['Exercise', 'Warmup'];

function isArrayUnique(array) {
  const hash = new Map(array.map(i => [i, i]));
  const isUnique = hash.size === array.length;

  return isUnique;
}

function isArraySorted(array) {
  const sortedArray = [...array];
  sortedArray.sort();
  const isSorted = JSON.stringify(array) === JSON.stringify(sortedArray);

  return isSorted;
}

// TODO: Variable number of people per scene - town gossip

const schema = yup.object().shape({
  title: yup.string().required(),
  type: yup
    .string()
    .required()
    .oneOf(activityTypes),
  foci: yup
    .array(yup.string().oneOf(focusNames))
    .required()
    .test('duplicates', 'focus must not contain duplicates', isArrayUnique)
    .test('sorted', 'focus must be in alphabetical order', isArraySorted),
  source: yup.string(),
  date: yup.date(),
  minimumPeople: yup
    .number()
    .required()
    .integer()
    .min(1),
  duration: yup
    .number()
    .required()
    .min(1),
  durationType: yup
    .string()
    .required()
    .oneOf(durationTypeNames),
  peoplePerScene: yup
    .number()
    .when('durationType', {
      is: 'Step',
      then: yup
        .number()
        .required()
        .integer(),
    })
    .test('minimumPeople', 'peoplePerScene must be at least equal to minimumPeople', function test(
      value,
    ) {
      if (this.parent.durationType !== 'Step') {
        return true;
      }

      return value <= this.parent.minimumPeople;
    }),
});

let errorCount = 0;

try {
  fs.readdir('content/activities/blueprints', (err, files) => {
    console.log('# Verification\n');
    files.forEach((filename) => {
      const filePath = `content/activities/blueprints/${filename}`;
      const data = fs.readFileSync(filePath, 'utf8');
      const documents = data.split('---');
      const meta = yaml.safeLoadAll(documents[1], { schema: yaml.JSON_SCHEMA });

      schema.validate(meta[0]).catch((validationError) => {
        errorCount += validationError.errors;
        validationError.errors.forEach((element) => {
          console.log(`${filename}:  ${element}`);
        });
      });
    });

    console.log(`${errorCount} errors`);
  });
} catch (e) {
  console.log(e);
}
