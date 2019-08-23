var assert = require('assert');
import { sCStorage } from 'schmucklicloud_storage';

describe('Bucket', function() {
    it('should keep the value, when the value has been passed.', function() {
      let expected_number = 23;

      let object = new sCStorage("4d4ff55414917628252ebcd373ade72e38005294", "17364a09ed982edb4089d5362e496b13e85b8060d474655ec6b58f57ea18aa60");
      object.setBucket(expected_number);

      assert.equal(object.bucket_id === 23, true);
    });
});
