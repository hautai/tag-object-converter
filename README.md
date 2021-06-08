# tag-object-converter
## change log
The parameters of 'obj2tag' method is changed from v0.0.2

## convert tag to object
```js
const { tag2obj } = require('tag-object-converter');

tag2obj('<tagName attr1="value1" attr2="value2" />');
// or
tag2obj('<tagName attr1="value1" attr2="value2">');

/** output
{
  tagName: 'tagName',
  attrs: {
    'attr1': 'value1',
    'attr2.': 'value2'
  },
  attrOrder: [
    'attr1',
    'attr2'
  ],
  isClosing: false
}
*/
```

```js
tag2obj('</tagName>');

/** output
{
  tagName: 'tagName',
  attrs: {},
  attrOrder: [],
  isClosing: true
}
*/
```
## convert object to tag
```js
const { obj2tag } = require('tag-object-converter');

const obj = {
  tagName: 'tagName',
  attrs: {
    'attr1': 'value1',
    'attr2.': 'value2'
  },
  // attrOrder is optional.
  // If attrOrder is not given, the attributes will be ordered by default in outputted tag
  attrOrder: [
    'attr2',
    'attr1'
  ]
};

const options = {
  isSelfClosing: true, // Boolean. Default => TRUE
  finalSpace: true // Boolean. Default => TRUE. If 'isSelfClosing' is FALSE, this option will always be FALSE.
};

obj2tag(obj, options);
// output
// <tagName attr2="value2" attr1="value1" />
```
