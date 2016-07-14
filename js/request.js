import request  from 'browser-request';

const promisedRequest = (options) => {
  options.json = true;
  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if(err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};

export default promisedRequest;
