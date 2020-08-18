import getIn from 'get-value';

import {toStr} from '/lib/util';
import libContent from '/lib/xp/content';
import portal from '/lib/xp/portal';

export const get = (request) => {
  //log.debug(`request:${toStr(request)}`);

  const content = portal.getContent();
  //log.debug(`content:${toStr(content)}`);

  const children = libContent.getChildren({
    key: content._id,
    start: 0,
    count: -1,
    sort: '_name ASC'
  });
  log.debug(`children:${toStr(children)}`);

  return {
    body: `<ol>
    ${children.hits.map((child) => `<li>
  <a href="${portal.pageUrl({id: child._id})}">${child._name}</a>
  <span>${getIn(child, 'x.media.imageInfo.byteSize', '')}</span>
  <span>${getIn(child, 'x.media.imageInfo.pixelSize', '')}</span>
</li>`).join('\n')}
</ol>`,
    contentType: 'text/html;charset=utf-8'
  }
} // export const get
