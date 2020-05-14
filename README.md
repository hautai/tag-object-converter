# tag-object-converter

## convert tag to object
```js
const { tag2obj } = require('tag-obj-converter');

tag2obj('<tagName attr1="value1" attr2="value2" />');
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
  ]
}
*/
```
## convert object to tag
```js
const { obj2tag } = require('tag-obj-converter');

const obj = {
  tagName: 'tagName',
  attrs: {
    'attr1': 'value1',
    'attr2.': 'value2'
  },
  attrOrder: [
    'attr2',
    'attr1'
  ]
};

const options = {
  isSelfClosing: true,
  finalSpace: true,
  attrOrder: obj.attrOrder
};

obj2tag(obj.tagName, obj.attrs, options);
// output
// <tagName attr2="value2" attr1="value1" />
```
