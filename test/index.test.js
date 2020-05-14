const { tag2obj, obj2tag } = require('../dist');

const tag1 = '<:tag_name attr:1="value1" _attr-2.="value2" />';
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

const tag2 = '<:tag_name _attr-2.="value2" attr:1="value1" />';

test('convert tag to object', () => {
  expect(tag2obj(tag1)).toStrictEqual(obj);
});

test('convert object to tag', () => {
  expect(obj2tag(obj.tagName, obj.attrs, { attrOrder: obj.attrOrder.reverse() })).toBe(tag2);
});