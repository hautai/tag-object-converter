const { tag2obj, obj2tag } = require('../dist');

const tag = '<:tag_name attr:1="value1" _attr-2.="value2" />';
const obj = {
  tagName: ':tag_name',
  attrs: {
    'attr:1': 'value1',
    '_attr-2.': 'value2'
  },
  attrOrder: [
    'attr:1',
    '_attr-2.'
  ]
};

test('convert tag to object', () => {
  expect(tag2obj(tag)).toStrictEqual(obj);
});

test('convert object to tag', () => {
  expect(obj2tag(obj.tagName, obj.attrs, { attrOrder: obj.attrOrder })).toBe(tag);
});