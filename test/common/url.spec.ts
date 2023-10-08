import 'mocha';
import { expect } from 'chai';
import { sliceEndDelimiter } from '@/common/url';

describe('Common Test', function () {
  it('sliceEndDelimiter function is normal.', function () {
    const hostname = 'https://example.com';
    const host = 'https://example.com:8080';

    const url1 = sliceEndDelimiter(hostname);
    const url2 = sliceEndDelimiter(hostname + '/');
    const url3 = sliceEndDelimiter(host);
    const url4 = sliceEndDelimiter(host + '/');

    expect(url1).to.equal(hostname);
    expect(url2).to.equal(hostname);
    expect(url3).to.equal(host);
    expect(url4).to.equal(host);
  });
});
