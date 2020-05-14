const tagNameRegex = /<([:a-z_A-Z][:a-z_A-Z\-.0-9]*)/;
const attrsRegex = /([:a-z_A-Z][:a-z_A-Z\-.0-9]*)="([^"]*?)"/g;

const tag2obj = tag => {
  const obj = { tagName: '', attrs: {}, attrOrder: [] };

  obj.tagName = tagNameRegex.exec(tag)[1];

  const attrs = tag.matchAll(attrsRegex);
  const { attrs: objAttrs, attrOrder } = obj;

  for (const [ , attrName, attrValue ] of attrs) {
    objAttrs[attrName] = attrValue;
    attrOrder.push(attrName);
  }

  return obj;
};

const obj2tag = (tagName, attrObj, { isSelfClosing = true, attrOrder = [], finalSpace = true }) => {
  finalSpace = finalSpace ? ' ' : '';
  let tag = `<${tagName}`;

  if (0 === attrOrder.length) {
    for (const [ attrName, attrValue ] of Object.entries(attrObj)) {
      tag += ` ${attrName}="${attrValue}"`;
    }
  }
  else {
    for (const attrName of attrOrder) {
      tag += ` ${attrName}="${attrObj[attrName]}"`;
    }
  }

  return tag += isSelfClosing ? `${finalSpace}/>` : '>';
};

module.exports = {
  tag2obj,
  obj2tag
};
