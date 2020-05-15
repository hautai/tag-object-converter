const { tag2obj, obj2tag } = require('../dist');

//
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

test('convert tag to object', () => {
  expect(tag2obj(tag1)).toStrictEqual(obj);
});

//
/*
const wrongTag = '</tag>';

test('throw err when encountering wrong tag format', () => {
  expect(() => tag2obj(wrongTag)).toThrow(/format/);
});
*/
//
const obj2 = {
  tagName: ':tag_name',
  attrs: {
    'attr:1': 'value1',
    '_attr-2.': 'value2'
  },
  attrOrder: [
    '_attr-2.',
    'attr:1'
  ]
};

const tag2 = '<:tag_name _attr-2.="value2" attr:1="value1" />';

test('convert object to tag', () => {
  expect(obj2tag(obj2)).toBe(tag2);
});

//
const obj3 = {
  tagName: ':tag_name',
  attrs: {
    'attr:1': 'value1',
    '_attr-2.': 'value2'
  }
};

const options = { finalSpace: false };

const tag3 = '<:tag_name attr:1="value1" _attr-2.="value2"/>';

test('convert object without attrOrder to tag', () => {
  expect(obj2tag(obj3, options)).toBe(tag3);
});