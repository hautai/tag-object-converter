const tagNameRegex = /^<([:a-z_A-Z][:a-z_A-Z\-.0-9]*)/;
const attrsRegex = /([:a-z_A-Z][:a-z_A-Z\-.0-9]*)="([^"]*?)"/g;

const tag2obj = tag => {
  let tagName = '', attrs = {}, attrOrder = [];

  try {
    tagName = tagNameRegex.exec(tag)[1];
  }
  catch(e) {
    e.message = `This tag format is not supported: ${tag}`;
    throw e;
  }

  const rawAttrs = tag.matchAll(attrsRegex);

  for (const [ , attrName, attrValue ] of rawAttrs) {
    attrs[attrName] = attrValue;
    attrOrder.push(attrName);
  }

  return { tagName, attrs, attrOrder };
};

const obj2tag = ({ tagName, attrs = {}, attrOrder = [] }, { isSelfClosing = true, finalSpace = true } = {}) => {
  finalSpace = finalSpace ? ' ' : '';
  let tag = `<${tagName}`;

  if (0 === attrOrder.length) {
    for (const [ attrName, attrValue ] of Object.entries(attrs)) {
      tag += ` ${attrName}="${attrValue}"`;
    }
  }
  else {
    for (const attrName of attrOrder) {
      tag += ` ${attrName}="${attrs[attrName]}"`;
    }
  }

  return tag += isSelfClosing ? `${finalSpace}/>` : '>';
};

module.exports = {
  tag2obj,
  obj2tag
};
